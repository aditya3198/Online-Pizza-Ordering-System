var orderModel = require("./schemas/order.js");

class Order {
  constructor() {}
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
}
module.exports = Order;
