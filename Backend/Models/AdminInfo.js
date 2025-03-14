const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: Number, required: true },
    Address: { type: Object, required: true },
    Bod: { type: String, required: true },
  },
  { minimize: false }
);

const AdminModel =
  mongoose.models.AdminInfo || mongoose.model("AdminInfo", adminSchema);

module.exports = AdminModel; // ✅ Correct export for CommonJS
