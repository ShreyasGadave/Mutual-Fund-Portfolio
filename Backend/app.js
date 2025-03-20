require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDB = require("./Config/ConnectDB");
const AdminModel = require("./Models/AdminInfo");
const ServiceModel = require("./Models/Service");

const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: process.env.FRONTEND_URI || "*", credentials: true }));
app.use(express.json());

ConnectDB(MONGO_URI);

// Admin Routes
app
  .route("/admin")
  .get(async (req, res) => {
    try {
      const admins = await AdminModel.find({}, "-__v");
      const services = await ServiceModel.find({}, "-__v");
      res.json([...admins, ...services]); // Flatten for frontend
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newAdmin = new AdminModel(req.body);
      console.log(req.body);
      
      await newAdmin.save();
      res.status(201).json({ message: "Admin created successfully!", adminData: newAdmin });
    } catch (error) {
      res.status(500).json({ message: "Error creating admin", error: error.message });
    }
  });

app
  .route("/admin/:id")
  .get(async (req, res) => {
    try {
      const admin = await AdminModel.findById(req.params.id).select("-__v");
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admin", error: error.message });
    }
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    try {
      const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
      if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
      res.json({ message: "Admin deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting admin", error: error.message });
    }
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
