import express from "express";
import userController from "../controllers/user.controller.js";
import {
  validateUidBody,
  validateUidParam,
} from "../validators/user.validation.js";
import validatorService from "../../../services/validator.valided.service.js";

const router = express.Router();

router.post("/auth", validateUidBody, validatorService, userController.getUserLogin);

export default router;
