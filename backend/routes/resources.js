const express = require("express");
const router = express.Router(); // ✅ MUST BE HERE

const Resource = require("../models/Resource");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Upload resource with file
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.body || !req.body.title) {
        return res.status(400).json({
          error: "Form data not received correctly"
        });
      }

      const resource = new Resource({
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description,
        fileUrl: req.file.path,
        fileType: req.file.mimetype,
        uploadedBy: req.user.id
      });

      await resource.save();

      res.status(201).json({
        message: "Resource uploaded successfully",
        resource
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all resources
router.get("/", async (req, res) => {
  const resources = await Resource.find()
    .populate("uploadedBy", "name role");
  res.json(resources);
});

module.exports = router;
