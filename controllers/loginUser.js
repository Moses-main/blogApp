const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

router.post("/users/login", async (req, res) => {
  global.loggedIn = null;

  try {
    const { username, password } = req.body;
    // check if the user exits in the database
    const user = await User.findOne({ username });
    if (user) {
      // compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Create JWTs
        const accessToken = jwt.sign(
          {
            username: username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5s" }
        );
        const refreshToken = jwt.sign(
          {
            username: username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1m" }
        );
        const currentUser = await User.findOne({ username: username });
        if (!currentUser) {
          error = "User not found";
          res.render("login", { error: error });
        }

        //GETTING THE OTHER USERS IN THE DATABASE EXCEPT FROM THE CURRENT USER THAT IS LOGGED IN

        const otherUsers = await User.find({
          username: { $ne: currentUser },
        });

        // Giving the current user an access token
        // that would be retrieved on the logout section
        const activeUser = { ...currentUser, refreshToken }; // the three dot serves as a way to add or merge files together using an array of strings in the above example

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        loggedIn = activeUser.refreshToken;
        res.redirect("/home");
      } else {
        const error = "Error: Incorrect Password.";
        res.render("login", { error: error });
      }
      if (password === undefined || password === null) {
        const error = "Error: Please enter password.";
        res.render("login", { error: error });
      }
    } else {
      const error =
        "Error: username not found, Check the details and try again.";
      res.render("login", { error: error });
    }
  } catch (error) {
    // console.error(error);
    logger.error(error);
    res.render("login", { error: error });
  }
});

module.exports = router;
