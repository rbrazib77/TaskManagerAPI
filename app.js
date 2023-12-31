const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
require("dotenv").config();

// Security Middleware Imports
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Bodyparser Application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security Middleware Implements
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 });
app.use(limiter);

// Database Connection
const URI = "mongodb://localhost:27017/TaskManagerTwo";
const OPTIONS = { user: "", pass: "", autoIndex: true };

mongoose.connect(URI, OPTIONS, (error) => {
  console.log("Database Connction Successful");
  console.log(error);
});

// Aplication Routes
app.use("/api/v1", router);

// Undefined Routes
app.use("*", (req, res) => {
    res.status(405).json({ status: "Undefined Route", data: "Not Found" });
  });


module.exports = app;
