module.exports = (req, res) => {
  var username = "";
  var password = "";

  if (typeof data != "undefined") {
    username = data.username;
    password = data.password;
  }

  res.render("register", {
    username: username,
    password: password,
  });
};
