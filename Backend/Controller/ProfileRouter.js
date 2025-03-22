const express = require("express");
const AdminRouter = express.Router();
const AdminModel = require("../Models/Profile");

// Get all admins
AdminRouter.get("/profile", async (req, res) => {
  try {
    const admins = await AdminModel.find().select("-__v");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// Create a new admin
AdminRouter.post("/profile", async (req, res) => {
  try {
    const newAdmin = await AdminModel.create(req.body);
    res.status(201).json({ message: "Admin created successfully!", adminData: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
});

// Get a single admin
AdminRouter.get("/profile/:id", async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id).select("-__v");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error: error.message });
  }
});

// Update an admin
AdminRouter.put("/profile/:id", async (req, res) => {
  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated!", adminData: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error: error.message });
  }
});

// Delete an admin
AdminRouter.delete("/profile/:id", async (req, res) => {
  try {
    const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error: error.message });
  }
});

module.exports = AdminRouter;
