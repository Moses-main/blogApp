const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  //check if the user exits in the database
  const user = await User.findOne({ username });

  if (!user) {
    // User not found in the database
    res.render("login", { errorMessage: "User not found. Please register" });
    return;
  }

  check;
  the;
  hashed;
  password;
  if (user) {
    bcrypt.compare(password, user.password, (error, same) => {
      if (same) {
        //if passwords match
        // store user session, will talk about it later
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
};
