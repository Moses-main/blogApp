const multer = require("multer");

//set the storage engine for the multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    //define the destination folder
    if (File.fieldname === "imgUrl") {
      cb(null, "uploads/images"); // images destination
    } else if (File.fieldname === "pdfFile") {
      cb(null, "uploads/pdf"); // pdf destination
    }
  },
  filename: function (req, res, cb) {
    // Define the file name when saved
    cb(null, file.originalname);
  },
});

// Initialize multer upload
const upload = multer({ storage });

module.exports = upload;
