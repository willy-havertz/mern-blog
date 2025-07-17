import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    photo: { type: String },
    username: { type: String, required: true },
    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
