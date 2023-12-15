const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const DB_URL = "mongodb://localhost/App"; //for local connection
const DB_URL = process.env.DB_URL;

// connecting to the database
mongoose.connect(DB_URL);
mongoose.connection;

const BlogPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postTitle: {
    type: String,
    required: true,
    unique: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Blog = new mongoose.model("post", BlogPostSchema);
module.exports = Blog;
