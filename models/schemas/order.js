var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userModel = require("./user");
var productModel = require("./product");

var userSchema = userModel.schema;
var productSchema = productModel.schema;

var orderSchema = new Schema({
  user: String,
  products: [productSchema]
});

module.exports = mongoose.model("Order", orderSchema);
