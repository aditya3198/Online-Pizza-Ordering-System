var orderModel = require("./schemas/order");
var Product = require("./Product");
class Order {
  constructor(user_id = "") {
    this.user_id = user_id;
    this.products = [];
  }
  findOne(key, value) {
    // var email = this.email;
    // var password = this.password;
    return new Promise((resolve, reject) => {
      orderModel.findOne({ key: value }, (err, order) => {
        if (err) {
          throw err;
        }
        resolve(order);
      });
    });
  }
  findAll() {
    return new Promise((resolve, reject) => {
      orderModel.find({}, (err, orders) => {
        if (err) {
          throw err;
        }
        resolve(orders);
      });
    });
  }
  async addProducts(items) {
    for (var i = 0; i < items.length; i++) {
      let p;
      var product = new Product("", items[i]);
      p = await product.findBySku(product.sku);
      this.products.push(p);
    }
  }
  addOrder() {
    var order = new orderModel({
      user: this.user_id,
      products: this.products
    });
    order.save(err => {
      if (err) {
        throw err;
      }
      console.log("Order successfully saved.");
    });
  }
}
module.exports = Order;
