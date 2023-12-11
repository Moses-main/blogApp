const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

router.post(
  "/signup",

  async (req, res) => {
    try {
      const { username, password } = req.body;
      // check if the user already exits in the database
      const exitingUser = await User.findOne({ username });

      if (exitingUser) {
        res.render("register", {
          // successMsg: req.flash("success"),
          error: "Username already taken. Please try another",
        });
        return;
      }

      const newUser = new User({ username, password });
      await newUser.save();

      //Create the JWTs
      // res.redirect("/users/login");
      res.render("login");
    } catch (error) {
      logger.error(error);
      res.render("register", { error: error.message });
    }
  }
);

module.exports = router;
