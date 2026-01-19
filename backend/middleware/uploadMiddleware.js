const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campus-connect",
    allowed_formats: ["jpg", "png", "pdf", "mp4"]
  }
});

const upload = multer({ storage });

module.exports = upload;
