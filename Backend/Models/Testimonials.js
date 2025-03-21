const mongoose = require("mongoose");

const TestimonialsSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

const TestimonialsModel = mongoose.model("Testimonials", TestimonialsSchema);
module.exports = TestimonialsModel;
