const express = require("express");
const router = express.Router();
const User = require("../models/User");

const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
  level: "error", // Set the log level
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new winston.transports.Console(), // Log errors to console
  ],
});

router.get("/auth/logout", async (req, res) => {
  const cookie = req.cookies;
  try {
    if (!cookie) {
      res.cookie("jwt", " ");
    } else {
      loggedIn = null;
      await res.clearCookie("jwt");
      res.render("index", loggedIn);
    }
  } catch (error) {
    // console.error(error);
    logger.error(error);
  }
});
module.exports = router;
