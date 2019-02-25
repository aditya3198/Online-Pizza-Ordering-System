var User = require("./User");
var Product = require("./Product");
var adminModel = require("./schemas/admin");

class Admin extends User {
  constructor(email = "", password = "", phoneno = "") {
    super(email, password, phoneno);
  }
  insertInDb() {
    var u = new adminModel({
      email: this.email,
      password: this.password,
      phoneno: this.phoneno,
      isAdmin: true
    });
    u.save(err => {
      if (err) {
        throw err;
      }
      console.log("Admin successfully saved.");
    });
  }
  findUser() {
    var email = this.email;
    var password = this.password;
    return new Promise((resolve, reject) => {
      adminModel.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
          throw err;
        }
        resolve(user);
      });
    });
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      adminModel.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        resolve(users);
      });
    });
  }
  checkDuplicate() {
    var email = this.email;

    return new Promise(function(resolve, reject) {
      adminModel.find(
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
  addItem(category, sku, name, imageUrl, description) {
    //Save product to database
    var product = new Product(name, sku, description, imageUrl, category);
    product.insertInDb();

    return "Item Added Successfully";
  }
  deleteItem(sku) {
    var product = new Product("", sku, "", "", "");
    product.delete("sku", sku);

    return "Item Deleted Successfully";
  }
}

module.exports = Admin;
