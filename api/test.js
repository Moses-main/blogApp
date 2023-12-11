const mongoose = require("mongoose");
const { BlogPost, Student } = require("../models/BlogPost");
const { User } = require("../models/User");
// const { configDotenv } = require("dotenv");
// // Replace 'your_database_url' with your actual MongoDB connection string
const dbURL = "mongodb://localhost/App";
// connecting to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// let BP = BlogPost.create({
//   title: "Third post",
//   body: "This is the Third blog post for for my project",
// });

// let cUser = User.create({
//   username: "Moses",
//   password: "12345",
// });

// if (BP) {
//   console.log("blog post created successfully");
// }
// if (cUser) {
//   console.log("user created successfully");
// } else {
//   console.log("Oops Error");
// }
