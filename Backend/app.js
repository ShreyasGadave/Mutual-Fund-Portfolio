require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const AdminRouter = require("./Controller/ProfileRouter");
const ServiceRouter = require("./Controller/ServiceRouter");
const AboutRouter = require("./Controller/AboutRouter");
const TestimonialRouter = require("./Controller/TestimonialsRouter");

const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: process.env.FRONTEND_URI || "*", CredentialCloudinary: true }));
app.use(express.json());

ConnectDB(MONGO_URI);

app.use(AdminRouter);

app.use(ServiceRouter);

app.use(AboutRouter);

app.use(TestimonialRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
