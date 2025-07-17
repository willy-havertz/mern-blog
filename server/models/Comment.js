import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
