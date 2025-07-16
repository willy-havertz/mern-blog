
const router = require("express").Router();
const upload = require("../utils/multer");

router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
    // success
    res.status(200).json({ filename: path.basename(req.file.path) });
  });
});

module.exports = router;
