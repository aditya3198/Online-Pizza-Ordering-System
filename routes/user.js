var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("profile", {
    title: "Profile",
    user: req.session.user
  });
  res.send("respond with a resource");
});

module.exports = router;
