var express = require("express");
var router = express.Router();
var User = require("../models/User");
/* GET home page. */
router.get("/", function(req, res, next) {
  // res.render("index", { title: "Express", layout: "layout" });
  var loggedIn = req.session.hasOwnProperty("user");
  res.render("index", { title: "Pizzaero", loggedIn: loggedIn });
});

router.get("/profile", function(req, res, next){
  var loggedIn = req.session.hasOwnProperty("user");
  res.render("profile", { title: "Profile", loggedIn: loggedIn });
});

router.get("/register", function(req, res, next) {
  res.render("register", { title: "Register" });
});

router.post("/register", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var phoneno = req.body.phoneno;

  var user = new User(email, password, phoneno);
  //check if user already exists
  var isDuplicate = await user.checkDuplicate();
  if (isDuplicate) {
    //Duplicate User, redirect back to registration page
    res.render("register", { title: "Register", error: "Duplicate User" });
    // res.redirect("/register?error=" + "Duplicate User");
  } else {
    //User not duplicate so enter user details in database
    user.insertInDb();
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

  var userMod = new User(email, password, phoneno);
  var user = await userMod.findUser();
  if (user == null) {
    // res.render("login", {
    //   title: "Login",
    //   error: "Wrong Credentials"
    // });
    console.log("wrong credentials");
    res.render("index", {
      title: "Pizzaero",
      loggedIn: 0,
      error: "Wrong Credentials"
    });
  } else {
    console.log("Successfull login");
    req.session.user = user;
    res.redirect("/");
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
// router.get("/allusers", async function(req, res, next) {
//   var user = new User();
//   var users = await user.findAll();
//   console.log(users);
//   res.render("allusers", { data: users });
// });
module.exports = router;
