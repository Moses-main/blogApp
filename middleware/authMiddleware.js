const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.sessionID);

  //   if ((error, user)) {
  // if (errorm || !user) return res.redirect("/");
  next();
  //   }
};
