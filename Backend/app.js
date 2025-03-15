// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express"); // Express framework for creating server
const cors = require("cors"); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const mongoose = require("mongoose"); // MongoDB object modeling tool
const ConnectDB = require("./Config/ConnectDB"); // Import database connection function
const AdminModel = require("./Models/AdminInfo"); // Import Mongoose model for Admin data

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3009; // Set port from environment variable or default to 3009
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB connection URI from environment variables

// Middleware configuration
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for frontend
app.use(express.json()); // Middleware to parse incoming JSON requests

ConnectDB(MONGO_URI);

// Define API routes for /admin
app.route("/admin")
  // GET request to fetch all admins
  .get(async (req, res) => {
    try {
      const admins = await AdminModel.find({}, "-__v"); // Fetch all admins excluding __v field
      res.json(admins); // Send the retrieved data as JSON response
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message }); // Handle errors
    }
  })


// Define API routes for /admin/:id (specific admin)
app.route("/admin/:id")
  // GET request to fetch a specific admin by ID
  .get(async (req, res) => {
    try {
      const admin = await AdminModel.findById(req.params.id).select("-__v"); // Find admin by ID, exclude __v field
      if (!admin) return res.status(404).json({ message: "Admin not found" }); // Handle not found case
      res.json(admin); // Send found admin data
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message }); // Handle errors
    }
  })
  // PUT request to update an existing admin by ID
  .put(async (req, res) => {
    try {
      const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return updated document
        runValidators: true, // Ensure validation rules are applied
      }).select("-__v");
      if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" }); // Handle not found case
      res.json({ message: "Admin updated!", adminData: updatedAdmin }); // Send success response
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message }); // Handle errors
    }
  });

// Start the Express server on the specified port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
