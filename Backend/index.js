require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const AdminRouter = require("./Controller/ProfileRouter");
const ServiceRouter = require("./Controller/ServiceRouter");
const AboutRouter = require("./Controller/AboutRouter");
const TestimonialRouter = require("./Controller/TestimonialsRouter");
const ServiceID = require("./Controller/ServiceID");
const DBRouter = require("./Controller/Database");
const LoginRouter = require("./Controller/LoginRouter");

const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors({
  origin: process.env.FRONTEND_URI || "*", 
  credentials: true 
}));

app.use(express.json());

ConnectDB(MONGO_URI);
 
app.use(LoginRouter)

app.use("/admin",AdminRouter);

app.use("/admin",ServiceRouter);

app.use("/admin",AboutRouter);

app.use("/admin",TestimonialRouter);

app.use(ServiceID)

app.use(DBRouter)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;