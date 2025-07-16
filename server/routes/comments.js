const router = require("express").Router();
const {
  createComment,
  getComments,
} = require("../controllers/commentController");

router.post("/", createComment);
router.get("/:postId", getComments);

module.exports = router;
