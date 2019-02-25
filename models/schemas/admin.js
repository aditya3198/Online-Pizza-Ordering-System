var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  email: String,
  password: String,
  phoneno: String,
  isAdmin: Boolean
});

module.exports = mongoose.model("Admin", adminSchema);
