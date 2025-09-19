import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";
import CommentModel from "../models/comment.model.js";

class CommentController {
  async addComment(req, res) {
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

      const { pid } = req.params;
      const { comment } = req.body;

      // Verify the post exists
      const post = await PostModel.findById(pid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // Get user information
      const user = await UserModel.findOne({ uid });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Create new comment
      const newComment = new CommentModel({
        pid: postId,
        comment,
        author: user.username,
      });

      const commentResponse = await newComment.save();

      res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: commentResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding comment",
        error: error.message,
      });
    }
  }

  async getCommentsByPostId(req, res) {
    try {
      const { pid } = req.params;

      // Verify the post exists
      const post = await PostModel.findById(pid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // Get all comments for the post
      const comments = await CommentModel.find({ pid: postId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving comments",
        error: error.message,
      });
    }
  }

  async deleteComment(req, res) {
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

      const { commentId } = req.params;

      // Find the comment
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }

      // Get user information to verify ownership
      const user = await UserModel.findOne({ uid });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if user is the author of the comment
      if (comment.author !== user.username) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own comments",
        });
      }

      await CommentModel.findByIdAndDelete(commentId);

      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting comment",
        error: error.message,
      });
    }
  }

  async updateComment(req, res) {
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

      const { commentId } = req.params;
      const { comment } = req.body;

      // Find the comment
      const existingComment = await CommentModel.findById(commentId);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }

      // Get user information to verify ownership
      const user = await UserModel.findOne({ uid });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if user is the author of the comment
      if (existingComment.author !== user.username) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own comments",
        });
      }

      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { comment },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: updatedComment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating comment",
        error: error.message,
      });
    }
  }
}

export default new CommentController();