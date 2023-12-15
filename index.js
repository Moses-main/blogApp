const express = require("express");
const app = express();
const router = express.Router();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const expressSession = require("express-session");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
// const verifyJWT = require("./middleware/verifyJWT");
// const accessToken = process.env.ACCESS_TOKEN_SECRET;
// const refreshToken = process.env.REFRESH_TOKEN_SECRET;

// The controllers
const landingPageController = require("./controllers/landingPageController");
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const postController = require("./controllers/post");
const indexController = require("./controllers/index");
const homeController = require("./controllers/home");
const newUserController = require("./controllers/newUser");
const loginController = require("./controllers/login");
const userController = require("./controllers/storeUser"); // load route for storing controllers
const loginUserController = require("./controllers/loginUser"); // load route for storing
const dashboardController = require("./controllers/dashboard");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
// const logoutController = require("./controllers/logout");
const logoutController = require("./controllers/logoutController");
const newBlogController = require("./controllers/blogController");
// const refreshTokenController = require("./controllers/refreshTokenController");

//Registering Middleware for my apps
global.loggedIn = null;

const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
  level: "error", // Set the log level
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new winston.transports.Console(), // Log errors to console
  ],
});

app.use((err, req, res, next) => {
  logger.error(err.stack); // Log the error stack trace
  res.status(500).send("Something went wrong!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use((error, req, res, next) => {
  res.render("register", { error: error.message });
});

// middleware for cookies
app.use(cookieParser());

app.set("view engine", "ejs"); // let express use the ejs for templating engine
//  Custom middleware
const customMiddleware = (req, res, next) => {
  console.log(`page shwoing ${req.url}`);
  next();
};

// This checks if the form fields are
app.use(customMiddleware);
// app.use("posts/store", validateMiddleware);

app.use("/", routes);
app.use("/users", userController);
// app.use("./routes", routes);

// GET request
app.get("/posts/new", authMiddleware, newPostController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post", postController);
app.get("/home", homeController);

// app.get("/", homeController);
app.get("/", landingPageController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
// app.get("/auth/login", refreshTokenController);
// app.get("/auth/authenticate", authUserController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/dashboard", dashboardController);
app.get("/auth/logout", logoutController);
app.post("/users/login", loginUserController);

// app.use("/auth/logout", require("./routes/refresh"));
//app.use(verifyJWT);
app.post("/users/signup", userController);

// app.post("/"); // app.use((req, res) => res.render("notfound")); // used to render 404 page
// router.get("/", newBlogController.getHomePage);
router.post("/create_post", newBlogController.createPost);
module.exports = router;

let port = process.env.PORT;
if (port == null || port == " ") {
  port = 4000;
}

app.listen(port, () => {
  console.log("App is listening ...");
});
