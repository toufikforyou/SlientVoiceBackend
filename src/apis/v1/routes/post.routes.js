import express from "express";
import validatorService from "../../../services/validator.valided.service.js";
import { validatePostBody } from "../validators/post.validation.js";
import postController from "../controllers/post.controller.js";
import { validateCommentBody } from "../validators/comment.validation.js";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", validatePostBody, validatorService, postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:pid", postController.getPostById);

router.post("/:pid/comments", validateCommentBody, validatorService, commentController.addComment);

router.get("/:pid/comments", commentController.getCommentsByPostId);

router.put("/comments/:commentId", validateCommentBody, validatorService, commentController.updateComment);

router.delete("/comments/:commentId", commentController.deleteComment);

export default router;
