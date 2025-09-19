import express from "express";
import validatorService from "../../../services/validator.valided.service.js";
import { validatePostBody } from "../validators/post.validation.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", validatePostBody, validatorService, postController.createPost);

router.get("/", postController.getAllPosts);

export default router;
