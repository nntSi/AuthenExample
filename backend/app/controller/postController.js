const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({sts: true, msg: `Create post successful`, body: newPost});
  } catch (err) {
    res.json({sts: false, msg: `Error is ${err}`});
  }
};

const getAllPost = async (req, res) => {
  try {
    const pst = await Post.find({user_id: req.params.user_id}).sort({createdAt: -1}).populate({path: "user_id", model: User});
    res.json({sts: true, msg: `Find all post`, body: pst});
  } catch (err) {
    res.json({sts: false, msg: `Error is ${err}`});
  }
}
module.exports = {
  createPost,
  getAllPost
}