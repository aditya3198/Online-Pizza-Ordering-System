var User = require("./User");
var customerModel = require("./schemas/customer");
var orderModel = require("./Order");

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
  placeOrder(items) {}
  getOrder(item) {}
}

module.exports = Customer;
