const express = require("express");
const router = express.Router();
// const Blog = require("../models/blog");
const blogController = require("./controllers/blogController");

router.post("/create_post", blogController.createPost);
router.get("/", blogController.getHomePage);

module.exports = router;
