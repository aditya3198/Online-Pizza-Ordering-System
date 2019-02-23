var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("User");

// var userSchema = new Schema({
//   // name: String,
//   email: { type: String, required: true, unique: true },
//   // username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phoneno: String,
//   // admin: Boolean,
//   // location: String,
//   // meta: {
//   // age: Number,
//   // website: String
//   // },
//   created_at: Date,
//   updated_at: Date
// });

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
  placeOrder(items) {}
  getOrder(item) {}
}

module.exports = Customer;
