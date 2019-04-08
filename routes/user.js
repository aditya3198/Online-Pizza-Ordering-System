var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Customer = require("../models/Customer");

router.get("/", async function(req, res, next) {
  if (
    req.session.user.hasOwnProperty("isAdmin") &&
    req.session.user.isAdmin == true
  ) {
    res.redirect("/admin");
  }
  var customer = new Customer(req.session.user.email);
  var orders = await customer.getOrders();
  res.render("profile", {
    title: "Profile",
    loggedIn: 1,
    notLoggedIn: 0,
    user: req.session.user,
    orders: orders
  });
});

router.post("/", async function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phoneno = req.body.phoneno;
  var address = req.body.address;

  var customer = new Customer(email);
  customer = await customer.findCustomerByEmail();

  customer.name = name ? name : customer.name;
  customer.phoneno = phoneno ? phoneno : customer.phoneno;
  customer.address = address ? address : customer.address;
  await customer.save();
  req.session.user = customer;

  res.redirect("/user/");
});

module.exports = router;
