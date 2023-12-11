module.exports = (req, res, next) => {
  if (req.sessionID) {
    // return res.redirect("/");
    // console.log(req.sessionID);
  }
  next();
};
