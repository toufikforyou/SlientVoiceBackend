import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";

class PostController {
  async createPost(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_USER_KEY_SECRET);
      const { uid } = decoded;

      if (!uid) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { title, desc, images } = req.body;

      // search user by uid
      const user = await UserModel.findOne({ uid });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newPost = new PostModel({
        author: user.username,
        title,
        desc,
        images,
      });

      const postResponse = await newPost.save();

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: postResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving post",
        error: error.message,
      });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await PostModel.find().sort({ createdAt: -1 });

      if (!posts || posts.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No posts found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving posts",
        error: error.message,
      });
    }
  }

  async getPostById(req, res) {
    try {
      const { pid } = req.params;
      const post = await PostModel.findById(pid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving post",
        error: error.message,
      });
    }
  }
}
export default new PostController();
