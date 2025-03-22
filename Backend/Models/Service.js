const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  ImageURL: { type: String, required: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  List: { type: [String] },
});

module.exports = mongoose.model("Service", ServiceSchema);
