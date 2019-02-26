var User = require("./User");
var customerModel = require("./schemas/customer");
var Order = require("./Order");
var orderModel = require("./schemas/order");

class Customer extends User {
  constructor(
    email = "",
    password = "",
    phoneno = "",
    address = "",
    name = ""
  ) {
    super(email, password, phoneno);
    this.address = address;
    this.name = name;
  }
  insertInDb() {
    var u = new customerModel({
      email: this.email,
      password: this.password,
      phoneno: this.phoneno,
      address: this.address,
      name: this.name
    });
    u.save(err => {
      if (err) {
        throw err;
      }
      console.log("Customer successfully saved.");
    });
  }
  findUser() {
    var email = this.email;
    var password = this.password;
    return new Promise((resolve, reject) => {
      customerModel.findOne(
        { email: email, password: password },
        (err, user) => {
          if (err) {
            throw err;
          }
          resolve(user);
        }
      );
    });
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      customerModel.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        resolve(users);
      });
    });
  }
  checkDuplicate() {
    var email = this.email;

    return new Promise(function(resolve, reject) {
      customerModel.find(
        {
          email: email
        },
        function(err, users) {
          if (users.length !== 0) {
            //Duplicate User
            resolve(1);
          } else {
            //Not duplicate
            resolve(0);
          }
        }
      );
    });
  }
  findCustomerByEmail() {
    var email = this.email;
    return new Promise((resolve, reject) => {
      customerModel.findOne({ email: email }, (err, customer) => {
        if (err) {
          throw err;
        }
        resolve(customer);
      });
    });
  }
  async placeOrder(items) {
    var cust = await this.findCustomerByEmail();
    var order = new Order(cust._id);
    await order.addProducts(items);
    await order.addOrder();
    return new Promise((resolve, reject) => {
      resolve("Order placed successfully");
    });
  }
  async getOrders() {
    var cust = await this.findCustomerByEmail();
    return new Promise((resolve, reject) => {
      orderModel.find({ user: cust._id }, (err, orders) => {
        if (err) {
          throw err;
        }
        resolve(orders);
      });
    });
  }
}

module.exports = Customer;
