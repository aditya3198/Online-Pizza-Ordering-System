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

  //Save product to database
  var product = new Product(name, sku, description, imageUrl, category);
  product.insertInDb();

  var message = "Item Added Successfully";
  res.redirect("/admin/?message=" + message);
});

router.post("/deleteitem", function(req, res, next) {
  var sku = req.body.sku;

  //Delete product from database
  var product = new Product("", sku, "", "", "");
  product.delete("sku", sku);

  var message = "Item Deleted Successfully";
  res.redirect("/admin/?message=" + message);
});
module.exports = router;
