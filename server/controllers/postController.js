
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {

    const { username } = req.user;
    const newPost = new Post({
      ...req.body,
      username,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createPost error:", err);
    res.status(500).json({ error: "Could not create post",details: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username !== req.user.username)
      return res.status(401).json("Not allowed");

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json(err);
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username !== req.user.username)
      return res.status(401).json("Not allowed");

    await post.delete();
    res.json("Post removed");
  } catch (err) {
    console.error("deletePost error:", err);
    res.status(500).json(err);
  }
};


exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error("getPost error:", err);
    res.status(500).json(err);
  }
};


exports.getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  try {
    const filter = { title: { $regex: search, $options: "i" } };
    const posts = await Post.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Post.countDocuments(filter);

    res.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getAllPosts error:", err);
    res.status(500).json(err);
  }
};
