import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
 
  res.status(200).json({
    url: req.file.path,
    filename: req.file.filename,
  });
});

export default router;
