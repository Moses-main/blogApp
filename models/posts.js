const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbURL = "mongodb://localhost/App";
// const dbURL = "mongodb+srv://Moses:moses@blogapp.xbpdw3q.mongodb.net/blogApp";

// connecting to the database
mongoose.connect(dbURL);
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
