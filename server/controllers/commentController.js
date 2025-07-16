const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const newC = new Comment(req.body);
    const saved = await newC.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};
