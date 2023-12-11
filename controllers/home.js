const BlogPost = require("../models/posts");

module.exports = async (req, res) => {
  const blogs = await BlogPost.find({});
  res.render("blogPage", { blogs });
};
