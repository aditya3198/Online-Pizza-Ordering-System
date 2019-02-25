var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  email: String,
  password: String,
  phoneno: String,
  address: String,
  name: String
});

module.exports = mongoose.model("Customer", customerSchema);
