var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  sku: String,
  description: String,
  imageUrl: String,
  category: String
});

module.exports = mongoose.model("Product", productSchema);
