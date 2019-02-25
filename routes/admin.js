var express = require("express");
var router = express.Router();
var Product = require("../models/Product");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  var message = req.query.hasOwnProperty("message") ? req.query.message : null;
  var product = new Product();
  var products = await product.findAll();

  res.render("admin", {
    title: "Admin",
    message: message,
    products: products
  });
});

router.post("/additem", function(req, res, next) {
  var category = req.body.category;
  var sku = req.body.sku;
  var name = req.body.name;
  var imageUrl = req.body.image_url;
  var description = req.body.description;

  var admin = new Admin();
  //Save product to database
  // var product = new Product(name, sku, description, imageUrl, category);
  // product.insertInDb();

  var message = admin.addItem(category, sku, name, imageUrl, description);
  res.redirect("/admin/?message=" + message);
});

router.post("/deleteitem", function(req, res, next) {
  var sku = req.body.sku;

  var admin = new Admin();
  //Delete product from database

  var message = admin.deleteItem(sku);
  res.redirect("/admin/?message=" + message);
});
module.exports = router;
