var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // name: String,
  email: { type: String, required: true, unique: true },
  // username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneno: String
  // admin: Boolean,
  // location: String,
  // meta: {
  // age: Number,
  // website: String
  // },
});

module.exports = mongoose.model("User", userSchema);
