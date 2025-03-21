require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const AdminRouter = require("./Controller/ProfileRouter");

const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: process.env.FRONTEND_URI || "*", credentials: true }));
app.use(express.json());

ConnectDB(MONGO_URI);

// Admin Routes
app.use(AdminRouter)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
