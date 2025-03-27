const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true }, // Ensure email is unique
  Password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);
module.exports = LoginModel;
