#!/usr/bin/env node

const jwt = require("jsonwebtoken");

// Define your payload
const payload = {
  user: "exampleUser",
};

// Define your secret key as a hexadecimal string
const secretKey = Buffer.from("yourHexSecretKey", "hex");

// Sign the JWT token
const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });

console.log(token);
