var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Customer = require("../models/Customer");

router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    loggedIn: 1,
    user: req.session.user
  });
});

router.post("/", async function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phoneno = req.body.phoneno;
  var address = req.body.address;

  var customer = new Customer(email);
  customer = await customer.findCustomerByEmail(email, customer.email);
  customer.name = name ? name : customer.name;
  customer.phoneno = phoneno ? phoneno : customer.phoneno;
  customer.address = address ? address : customer.address;
  await customer.save();
});

module.exports = router;
