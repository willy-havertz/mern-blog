
const express = require("express");
const path = require("path"); 
const upload = require("../utils/multer");

const router = express.Router();

router.post("/", (req, res) => {
  // Use the single-file middleware directly
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ filename: path.basename(req.file.path) });
  });
});

module.exports = router;
