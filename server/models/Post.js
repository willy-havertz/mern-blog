const mongoose = require("mongoose");
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
module.exports = mongoose.model("Post", PostSchema);
