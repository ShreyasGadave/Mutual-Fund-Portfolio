const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  List: { type: String},
});

const ServiceModel = mongoose.model("Service", ServiceSchema);
module.exports = ServiceModel;

