const express = require("express");
const LoginModel = require("../Models/Login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginRouter = express.Router();

LoginRouter.post("/admin", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    const userDB = await LoginModel.findOne({ Email });
    if (!userDB) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const isPasswordCorrect = await bcrypt.compare(Password, userDB.Password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const token = jwt.sign({ Email: userDB.Email }, "SdAdyWHDsgfjgbjFCJN", { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = LoginRouter;
