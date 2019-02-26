var productsModel = require("./schemas/product");

class Product {
  constructor(
    name = "",
    sku = "",
    description = "",
    imageUrl = "",
    category = ""
  ) {
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
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
      console.log("Product successfully saved.");
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
  findBySku(value) {
    return new Promise((resolve, reject) => {
      productsModel.findOne({ sku: value }, (err, product) => {
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
