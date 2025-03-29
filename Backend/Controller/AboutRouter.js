const express = require("express");
const AboutRouter = express.Router();
const AboutModel = require("../Models/About");

// ✅ Get all about sections
AboutRouter.get("/about", async (req, res) => {
  try {
    const aboutSections = await AboutModel.find().select("-__v");
    res.status(200).json(aboutSections);
  } catch (error) {
    console.error("Error fetching about sections:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// ✅ Create a new about section
AboutRouter.post("/about", async (req, res) => {
  try {
    const { Title=[], Description, List=[]} = req.body;

    // ✅ Validate required fields (List is now optional)
    if (!Description) {
      return res.status(400).json({
        message: "Title and Description are required.",
      });
    }

    // ✅ Ensure List is an array if provided
    if (List && !Array.isArray(List)) {
      return res.status(400).json({
        message: "List must be an array.",
      });
    }

    // ✅ Check if all List items are strings
    if (!List.every((item) => typeof item === "string" && item.trim() !== "")) {
      return res
        .status(400)
        .json({ message: "List items must be non-empty strings." });
    }

    // ✅ Create a new About document
    const newAbout = new AboutModel({ Title, Description, List });
    await newAbout.save();

    res
      .status(201)
      .json({ message: "About section created successfully!", data: newAbout });
  } catch (error) {
    console.error("Error creating about section:", error);
    res
      .status(500)
      .json({ message: "Error creating about section", error: error.message });
  }
});


// ✅ Delete an about section by ID
AboutRouter.delete("/about/:id", async (req, res) => {
  try {
    const deletedAbout = await AboutModel.findByIdAndDelete(req.params.id);
    if (!deletedAbout)
      return res.status(404).json({ message: "About section not found" });
    res.json({ message: "About section deleted successfully!" });
  } catch (error) {
    console.error("Error deleting about section:", error);
    res
      .status(500)
      .json({ message: "Error deleting about section", error: error.message });
  }
});

module.exports = AboutRouter;
