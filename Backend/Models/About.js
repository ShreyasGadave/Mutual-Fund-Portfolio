const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  List: { type: [String]}, 
});

const AboutModel = mongoose.model("About", AboutSchema);
module.exports = AboutModel;
