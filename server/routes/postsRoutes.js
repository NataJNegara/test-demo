import express from "express";
import {
  addPost,
  getPosts,
  deletePost,
  updatePost,
  getUserPosts,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// get all post route
router.get("/", getPosts);

// get all post own by logged-in user route
router.get("/user", auth, getUserPosts);

// add post route
router.post("/", auth, addPost);

// delete post route
router.delete("/:id", auth, deletePost);

// update post route
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
