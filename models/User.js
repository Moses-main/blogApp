const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const DB_URL = "mongodb://localhost/App"; // for the local database
// const DB_URL = process.env.DB_HOME; // for the local database
const DB_URL = process.env.MONGODB_URI;
const uniqueValidator = require("mongoose-unique-validator");

// connecting to the database
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
mongoose.connection;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter Password"],
  },
});

userSchema.plugin(uniqueValidator);

// middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password useing the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // replace the plain text password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the entered password withe the stored hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (errror) {
    throw error;
  }
};

const formModel = mongoose.model("Users", userSchema);
module.exports = formModel;
