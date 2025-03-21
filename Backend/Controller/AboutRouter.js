const express = require("express");
const AboutRouter = express.Router();
const AboutModel = require("../Models/About");

// ✅ Get all about sections
AboutRouter.get("/admin/about", async (req, res) => {
  try {
    const aboutSections = await AboutModel.find().select("-__v");
    res.status(200).json(aboutSections);
  } catch (error) {
    console.error("Error fetching about sections:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// ✅ Create a new about section
AboutRouter.post("/admin/about", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging

    const { Title, Description, List } = req.body;

    // ✅ Validate request body
    if (!Title || !Description || !Array.isArray(List) || List.length === 0) {
      return res.status(400).json({ message: "All fields are required, and List must have at least one item." });
    }

    // ✅ Check if all List items are strings
    if (!List.every(item => typeof item === "string" && item.trim() !== "")) {
      return res.status(400).json({ message: "List items must be non-empty strings." });
    }

    // ✅ Create a new About document
    const newAbout = new AboutModel({ Title, Description, List });
    await newAbout.save();

    res.status(201).json({ message: "About section created successfully!", data: newAbout });

  } catch (error) {
    console.error("Error creating about section:", error);
    res.status(500).json({ message: "Error creating about section", error: error.message });
  }
});

// // ✅ Get a single about section by ID
// AboutRouter.get("/admin/about/:id", async (req, res) => {
//   try {
//     const about = await AboutModel.findById(req.params.id).select("-__v");
//     if (!about) return res.status(404).json({ message: "About section not found" });
//     res.status(200).json(about);
//   } catch (error) {
//     console.error("Error fetching about section:", error);
//     res.status(500).json({ message: "Error fetching about section", error: error.message });
//   }
// });

// // ✅ Delete an about section by ID
// AboutRouter.delete("/admin/about/:id", async (req, res) => {
//   try {
//     const deletedAbout = await AboutModel.findByIdAndDelete(req.params.id);
//     if (!deletedAbout) return res.status(404).json({ message: "About section not found" });
//     res.json({ message: "About section deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting about section:", error);
//     res.status(500).json({ message: "Error deleting about section", error: error.message });
//   }
// });

module.exports = AboutRouter;
