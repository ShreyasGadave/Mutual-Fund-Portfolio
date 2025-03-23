const express = require("express");
const TestimonialRouter = express.Router();
const TestimonialModel = require("../Models/Testimonials");

// ✅ Get all testimonials
TestimonialRouter.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().select("-__v");
    res.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// ✅ Create a new testimonial (Only `Name` & `Description`)
TestimonialRouter.post("/testimonials", async (req, res) => {
  try {
    const { Name, Description } = req.body;
    if (!Name || !Description) {
      return res
        .status(400)
        .json({ message: "Both Name and Description are required." });
    }
    const newTestimonial = await TestimonialModel.create({
      Name,
      Description,
    });
    res.status(201).json({
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

// ✅ Delete a testimonial by ID
TestimonialRouter.delete("/testimonials/:id", async (req, res) => {
  try {
    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTestimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    res.json({ message: "Testimonial deleted successfully!" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res
      .status(500)
      .json({ message: "Error deleting testimonial", error: error.message });
  }
});

module.exports = TestimonialRouter;
