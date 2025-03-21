const express = require("express");
const ServiceRouter = express.Router();
const ServiceModel = require("../Models/Service");

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
ServiceRouter.post("/admin/service", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log received data

    if (!req.body.Title || !req.body.Description || !Array.isArray(req.body.List)) {
      return res.status(400).json({ message: "All fields are required and List must be an array" });
    }

    const newAdmin = await ServiceModel.create(req.body);
    res.status(201).json({ message: "Admin created successfully!", adminData: newAdmin });

  } catch (error) {
    console.error("Error creating admin:", error); // Log actual error details
    res.status(500).json({ message: "Error creating admin", error: error.message });
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
