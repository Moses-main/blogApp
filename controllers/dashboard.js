const BlogPost = require("../models/posts");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({});
  if (blogposts) {
    // Send the session cookie
    // res.cookie("sessionID", req.sessionID, {
    /* cookie options */
    // });
    // res.send("Session cookie sent successfully!");
    console.log(req.sessionID + " is the users id from the database");
    res.render("dashboard", { blogposts });
  } else {
    res.send("No data in the database. Session cookie not sent.");
  }
};
