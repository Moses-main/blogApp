const { request } = require("express");
const BlogPost = require("../models/posts");
const User = require("../models/User");
const winston = require("winston"); // for logging errors

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", levle: "error" }),
    new winston.transports.Console(), // logs errors to console
  ],
});

exports.getHomePage = async (req, res) => {
  try {
    const posts = await BlogPost.find({}).populate("userId", "username"); // const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    logger.error(error.message);
    // res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { postTitle, postContent, userId } = req.body;

  if (!postContent && !postTitle) {
    return res.render("create", { error: "No Title and Content found" });
  } else if (!postTitle && postContent) {
    return res.render("create", {
      error: "Please a blog title",
    });
  } else if (!postContent && !postTitle) {
    return res.render("create", { error: "Oops no blog content" });
  } else {
    try {
      const existingTitle = await BlogPost.findOne({ postTitle });

      if (existingTitle) {
        return res.render("create", {
          error:
            "A blog with title '" +
            existingTitle.postTitle +
            "' already exists'",
        });
      }
      // for saving the image sent to the database
      // const imgUrl = req.file.path;

      const newBlog = new BlogPost({
        postTitle: postTitle,
        postContent: postContent,
        userId: userId,
      });
      // const newPost = await BlogPost.create({
      //   postTitle: postTitle,
      //   postContent: postContent,
      //   userId: userId,
      // });

      // if (!newPost) return res.json({ error: "Post not created" });

      // try {
      //   const postWithUser = await BlogPost.aggregate([
      //     {
      //       $match: { _id: newPost._id }, //match the newly created post
      //     },
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "userId",
      //         foreignField: "_id",
      //         as: "user",
      //       },
      //     },
      //     {
      //       $unwind: "$user",
      //     },
      //     {
      //       $project: {
      //         _id: 1,
      //         title: 1,
      //         content: 1,
      //         username: "$user.username",
      //         //Include the other fields you want need fromt he post and user.
      //       },
      //     },
      //   ]);

      //   if (!postWithUser || postwithUser.length === 0) {
      //     return res.status(404).json({ error: "Post not found" });
      //   } else {
      //     return res.json(postWithUser[0]);
      //   }
      // } catch (error) {
      //   return res.status(404).json({ error: error.message });
      // }
      // const user = await User.findById(userId);
      // const username = user.username;
      // return res.json({ "post ": newPost, username });

      if (req.cookies?.jwt) {
        await newBlog.save();
        // const blogs = await BlogPost.find({}.populate());
        const blogs = await BlogPost.find({});
        loggedIn = true;
        res.render("blogPage", { blogs });
        // try {
        // const postWithUser = await BlogPost.find({})

        // return res.status(200).json({ blogs });
        // } catch (error) {
        //   console.error(error);
        // }
        //POPULATING THE BLOGS USING THE FOREGIN KEY IN THE TABLE
      } else {
        return res.status(200).json({ message: "Cookie Not Known" });
      }
    } catch (error) {
      return res.render("create", {
        error: error.message,
      });
    }
  }
};
