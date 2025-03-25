const express = require("express");
const mongoose = require("mongoose");

const DBRouter = express.Router();

// API Endpoint to get storage stats
DBRouter.get("/api/storage", async (req, res) => {
  try {
    const stats = await mongoose.connection.db.stats();
    res.json({
      storageSizeMB: (stats.storageSize / 1024 / 1024).toFixed(2), // Convert to MB
      dataSizeMB: (stats.dataSize / 1024 / 1024).toFixed(2),
      indexSizeMB: (stats.indexSize / 1024 / 1024).toFixed(2),
      collections: stats.collections,
    });
  } catch (error) {
    console.error("Error fetching storage stats:", error);
    res.status(500).json({ error: "Failed to fetch storage stats" });
  }
});

module.exports = DBRouter;
