const express = require("express");
const ServiceRouter = express.Router();
const ServiceModel = require("../Models/Service");
const UploadCloudinary = require("../Models/CloudinaryStorage");

// Get all admins
ServiceRouter.get("/service", async (req, res) => {
  try {
    const admins = await ServiceModel.find().select("-__v");
    res.json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// Create a new admin
ServiceRouter.post(
  "/service",
  UploadCloudinary.single("image"),
  async (req, res) => {
    try {
      // Check if required fields exist
      if (!req.body.Title || !req.body.Description || !req.file) {
        return res
          .status(400)
          .json({ message: "Title, Description, and Image are required!" });
      }

      // Create a new service entry
      const newService = new ServiceModel({
        ImageURL: req.file.path, // Cloudinary image URL
        Title: req.body.Title,
        Description: req.body.Description,
        List: req.body.List ? JSON.parse(req.body.List) : [], // Convert List string to array
      });

      await newService.save(); // Save to MongoDB
      console.log("Service Created:", newService);

      res
        .status(201)
        .json({
          message: "Service created successfully!",
          service: newService,
        });
    } catch (error) {
      console.error("Error creating service:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

ServiceRouter.put("/service/:id", async (req, res) => {
  try {
    const updatedAdmin = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");

    if (!updatedAdmin)
      return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated!", adminData: updatedAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating admin", error: error.message });
  }
});

// Delete an admin
ServiceRouter.delete("/service/:id", async (req, res) => {
  try {
    const deletedAdmin = await ServiceModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin)
      return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
});

module.exports = ServiceRouter;
