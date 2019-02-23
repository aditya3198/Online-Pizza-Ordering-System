var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  sku: String,
  description: String,
  imageUrl: String,
  category: String,
  created_at: Date,
  updated_at: Date
});

var productsModel = mongoose.model("Product", productSchema);

class Product {
  //   var name;
  //   var sku;
  //   var description;
  //   var imageUrl;
  //   var category;
  constructor() {
    this.name = "";
    this.sku = "";
    this.description = "";
    this.imageUrl = "";
    this.category = "";
  }
  insertInDb() {
    var p = new productsModel({
      name: this.name,
      sku: this.sku,
      description: this.description,
      imageUrl: this.imageUrl,
      category: this.category
    });
    p.save(err => {
      if (err) {
        throw err;
      }
      //   console.log("User successfully saved.");
    });
  }

  findProduct(key, value) {
    return new Promise((resolve, reject) => {
      productsModel.findOne({ key: value }, (err, product) => {
        if (err) {
          throw err;
        }
        resolve(product);
      });
    });
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      productsModel.find({}, function(err, products) {
        if (err) throw err;

        // object of all the users
        resolve(products);
      });
    });
  }

  delete(key, value) {
    return new Promise(function(resolve, reject) {
      productsModel.findOneAndRemove({ key: value }, function(err) {
        reject("Cannot find product");
      });
    });
  }
}

module.exports = Product;
