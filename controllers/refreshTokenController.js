const express = require("express");
// const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    // const error = "error: no cookies found";
    res.sendStatus(401);
  }
  // res.send(JSON.stringify(cookies.jwt));
  console.log(cookies.jwt);
  const refreshToken = cookies.refreshToken;

  const foundUser = User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    return sendStatus(403); // Forbidden
  }
  // evaluate jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403); // Forbidden
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
