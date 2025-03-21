const express = require("express");
const TestimonialRouter = express.Router();
const TestimonialModel = require("../Models/Testimonials");

// ✅ Get all testimonials
TestimonialRouter.get("/admin/testimonials", async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().select("-__v");
    res.json(testimonials);
  } catch (error) {
    res
      .status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// ✅ Create a new testimonial
TestimonialRouter.post("/admin/testimonials", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    if (!!req.body.Title || !req.body.Description) {
      return res
        .status(400)
        .json({
          message: "All fields are required. Rating must be between 1 and 5.",
        });
    }

    const newTestimonial = await TestimonialModel.create(req.body);
    res
      .status(201)
      .json({
        message: "Testimonial added successfully!",
        data: newTestimonial,
      });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res
      .status(500)
      .json({ message: "Error creating testimonial", error: error.message });
  }
});

// // ✅ Get a single testimonial by ID
// TestimonialRouter.get("/admin/testimonials/:id", async (req, res) => {
//   try {
//     const testimonial = await TestimonialModel.findById(req.params.id).select("-__v");
//     if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
//     res.status(200).json(testimonial);
//   } catch (error) {
//     console.error("Error fetching testimonial:", error);
//     res.status(500).json({ message: "Error fetching testimonial", error: error.message });
//   }
// });

// // ✅ Delete a testimonial by ID
// TestimonialRouter.delete("/admin/testimonials/:id", async (req, res) => {
//   try {
//     const deletedTestimonial = await TestimonialModel.findByIdAndDelete(req.params.id);
//     if (!deletedTestimonial) return res.status(404).json({ message: "Testimonial not found" });
//     res.json({ message: "Testimonial deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     res.status(500).json({ message: "Error deleting testimonial", error: error.message });
//   }
// });

module.exports = TestimonialRouter;
