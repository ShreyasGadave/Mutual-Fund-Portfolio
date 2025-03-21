const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true }, // Ensure email is unique
  Phone: { type: String, required: true },
  Address: { type: String, required: true },
  Bod: { type: String, required: true },
});

const AdminModel = mongoose.model("Profile", AdminSchema);
module.exports = AdminModel;
