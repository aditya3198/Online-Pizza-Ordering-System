var userModel = require("./schemas/user");

class User {
  // var email;
  // var password;
  // var name;
  // var address;
  // var phoneno;

  constructor(email = "", password = "", phoneno = "") {
    this.email = email;
    this.password = password;
    this.phoneno = phoneno;
  }

  insertInDb() {
    var u = new userModel({
      email: this.email,
      password: this.password,
      phoneno: this.phoneno
    });
    u.save(err => {
      if (err) {
        throw err;
      }
      //   console.log("User successfully saved.");
    });
  }

  findUser() {
    var email = this.email;
    var password = this.password;
    return new Promise((resolve, reject) => {
      userModel.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
          throw err;
        }
        resolve(user);
      });
    });
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      userModel.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        resolve(users);
      });
    });
  }
  checkDuplicate() {
    var email = this.email;

    return new Promise(function(resolve, reject) {
      userModel.find(
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
}

module.exports = User;
