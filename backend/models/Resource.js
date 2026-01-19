const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  fileUrl: String,        // 🔥 NEW
  fileType: String,       // 🔥 NEW
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
