const express = require("express");
const ServiceRouter = express.Router();
const ServiceModel = require("../Models/Service");

// Get a specific service by ID
ServiceRouter.get("/service/:id", async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.id).select("-__v");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

module.exports = ServiceRouter;
