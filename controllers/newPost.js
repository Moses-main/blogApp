module.exports = (req, res) => {
  if (req.cookies?.jwt) {
    return res.render("create");
  }
  res.redirect("/auth/login");
};
