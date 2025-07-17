import express from "express";
import auth from "../middleware/auth.js";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getPost);
router.get("/", getAllPosts);

export default router;
