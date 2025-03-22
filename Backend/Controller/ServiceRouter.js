const express = require("express");
const ServiceRouter = express.Router();
const ServiceModel = require("../Models/Service");
const  UploadCloudinary=require('../Models/CloudinaryStorage')

// Get all admins
ServiceRouter.get("/admin/service", async (req, res) => {
  try {
    const admins = await ServiceModel.find().select("-__v");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// Create a new admin
ServiceRouter.post("/admin/service",  UploadCloudinary.single("image"), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log received data

    // Check if required fields exist
    if (!req.body.Title || !req.body.Description || !req.file) {
      return res.status(400).json({ message: "Title, Description, and Image are required!" });
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

    res.status(201).json({ message: "Service created successfully!", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



// Get a single admin
// ServiceRouter.get("/admin/:id", async (req, res) => {
//   try {
//     const admin = await ServiceModel.findById(req.params.id).select("-__v");
//     if (!admin) return res.status(404).json({ message: "Admin not found" });
//     res.json(admin);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching admin", error: error.message });
//   }
// });

// // Delete an admin
// ServiceRouter.delete("/admin/:id", async (req, res) => {
//   try {
//     const deletedAdmin = await ServiceModel.findByIdAndDelete(req.params.id);
//     if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
//     res.json({ message: "Admin deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting admin", error: error.message });
//   }
// });

module.exports = ServiceRouter;
