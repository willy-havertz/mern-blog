const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getPost);
router.get("/", getAllPosts);

module.exports = router;
