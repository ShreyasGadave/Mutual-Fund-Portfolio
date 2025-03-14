const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDB = require("./Config/ConnectDB");
const AdminModel = require("./Models/AdminInfo");

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
ConnectDB("mongodb+srv://Shreyas0777:Shreyas0777@shreyas.idqi4.mongodb.net/AniketMangave");

// Handle the POST request to store data in MongoDB
app.post("/admin", async (req, res) => {
  try {
    console.log("Came on", req.method);
    console.log("Received Data:", req.body);

    const newAdmin = new AdminModel({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Address: req.body.Address,
      Bod: req.body.Bod,
    });

    const savedAdmin = await newAdmin.save();

    res.json({
      message: "Admin data saved successfully!",
      adminData: savedAdmin,
    });
  } catch (error) {
    console.error("Error saving admin data:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

const Port = 3009;
app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});
