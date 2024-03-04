import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

// --------------------------GET ALL THE POST--------------------------------

const getPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// --------------------------GET THE POST FOR CERTAIN USER--------------------------------

const getUserPosts = async (req, res) => {
  // grab the authenticated user from req body
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.find({ user: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ post, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------CREATE POST--------------------------------

const addPost = async (req, res) => {
  // grab data from request body
  const { title, body } = req.body;

  // if fields is empty
  if (!title || !body)
    return res.status(400).json({ error: "all field are required" });

  // grab the authenticated user from req body
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({ user: user._id, title, body });
    res.status(200).json({ success: "Post created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------DELETE POST--------------------------------
const deletePost = async (req, res) => {
  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // check if user own the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Unauthorize user" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------------------- POST-UPDATE-------------------------------

const updatePost = async (req, res) => {
  // grab data from request body
  const { title, body } = req.body;

  // if fields is empty
  if (!title || !body)
    return res.status(400).json({ error: "all field are required" });

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // check if user own the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Unauthorize user" });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, addPost, deletePost, updatePost, getUserPosts };
