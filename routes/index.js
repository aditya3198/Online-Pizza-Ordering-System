var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Customer = require("../models/Customer");
var Admin = require("../models/Admin");
var Product = require("../models/Product");

/* GET home page. */
router.get("/", function(req, res, next) {
  // res.render("index", { title: "Express", layout: "layout" });
  var message = req.query.hasOwnProperty("message") ? req.query.message : null;
  var loggedIn = req.session.hasOwnProperty("user");
  res.render("index", {
    title: "Pizzaero",
    loggedIn: loggedIn,
    notLoggedIn: !loggedIn,
    message: message
  });
});

// router.get("/profile", function(req, res, next) {
//   var loggedIn = req.session.hasOwnProperty("user");
//   res.render("profile", {
//     title: "Profile",
//     loggedIn: loggedIn,
//     user: req.session.user
//   });
// });

router.get("/register", function(req, res, next) {
  res.render("register", { title: "Register" });
});

router.post("/register", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var phoneno = req.body.phoneno;

  var customer = new Customer(email, password, phoneno);
  //check if user already exists
  var isDuplicate = await customer.checkDuplicate();
  if (isDuplicate) {
    res.render("register", { title: "Register", error: "Duplicate User" });
    // res.redirect("/register?error=" + "Duplicate User");
  } else {
    //Duplicate User, redirect back to registration page
    customer.insertInDb();

    res.redirect("/");
  }
});
router.get("/adminregister", function(req, res, next) {
  //User not duplicate so enter user details in database
  res.render("register", { title: "Register" });
});
router.post("/adminregister", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var phoneno = req.body.phoneno;

  var admin = new Admin(email, password, phoneno);
  //check if user already exists
  var isDuplicate = await admin.checkDuplicate();
  if (isDuplicate) {
    //Duplicate User, redirect back to registration page
    res.render("register", { title: "Register", error: "Duplicate User" });
    // res.redirect("/register?error=" + "Duplicate User");
  } else {
    //User not duplicate so enter user details in database
    admin.insertInDb();

    res.redirect("/");
  }
});

// router.get("/login", function(req, res, next) {
//   res.render("login", { title: "Login" });
// });

router.post("/login", async function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var phoneno = req.body.phoneno;
  var isAdmin = req.body.admin;

  if (isAdmin == "on") {
    var adminMod = new Admin(email, password, phoneno);
    var admin = await adminMod.findUser();
    if (admin == null) {
      // res.render("login", {
      //   title: "Login",
      //   error: "Wrong Credentials"
      // });
      // console.log("wrong credentials");
      res.render("index", {
        title: "Pizzaero",
        loggedIn: 0,
        notLoggedIn: 1,
        error: "Wrong Credentials"
      });
    } else {
      // console.log("Successfull login");
      req.session.user = admin;
      res.redirect("/admin/");
    }
  } else {
    var customerMod = new Customer(email, password, phoneno);
    var customer = await customerMod.findUser();
    if (customer == null) {
      // res.render("login", {
      //   title: "Login",
      //   error: "Wrong Credentials"
      // });
      // console.log("wrong credentials");
      res.render("index", {
        title: "Pizzaero",
        loggedIn: 0,
        notLoggedIn: 1,
        error: "Wrong Credentials"
      });
    } else {
      // console.log("Successfull login");
      req.session.user = customer;
      res.redirect("/user/");
    }
  }
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});
router.get("/menu", async function(req, res, next) {
  var loggedIn = req.session.hasOwnProperty("user");
  var message = req.query.hasOwnProperty("message") ? req.query.message : null;

  var products = new Product();
  products = await products.findAll();
  var cat1 = [];
  var cat2 = [];
  var cat3 = [];
  var cat4 = [];
  products.forEach(x => {
    if (x.category === "Veg") {
      cat1.push(x);
    } else if (x.category === "Non-Veg") {
      cat2.push(x);
    } else if (x.category === "Side") {
      cat3.push(x);
    } else {
      cat4.push(x);
    }
  });
  res.render("menu", {
    products: products,
    loggedIn: loggedIn,
    notLoggedIn: !loggedIn,
    message: message,
    cat1: cat1,
    cat2: cat2,
    cat3: cat3,
    cat4: cat4
  });
});
router.post("/placeorder", async function(req, res, next) {
  var skus = req.body.skus;
  var user = req.session.user;
  if (skus.constructor !== Array) skus = [skus];

  if (user === undefined) {
    res.redirect("/menu?message=" + "Please login placing an order");
  } else {
    if (
      user.phoneno == "" ||
      user.name == "" ||
      user.email == "" ||
      user.address == ""
    ) {
      res.redirect(
        "/menu?message=" +
          "Please complete your profile before placing an order"
      );
    }
    var u = new Customer(user.email);
    // skus = ["Pizza1", "Pizza3"];
    var message = await u.placeOrder(skus);
    res.render("ord/?message=" + message);
//     res.redirect("/?message=" + message);
  }
});

router.get("/aboutus", function(req, res, next) {
  var message = req.query.hasOwnProperty("message") ? req.query.message : null;
  var loggedIn = req.session.hasOwnProperty("user");
  res.render("aboutus", {
    title: "About Us",
    message: message,
    loggedIn: loggedIn,
    notLoggedIn: !loggedIn
  });
});
// router.get("/allusers", async function(req, res, next) {
//   var user = new User();
//   var users = await user.findAll();
//   console.log(users);
//   res.render("allusers", { data: users });
// });
module.exports = router;
