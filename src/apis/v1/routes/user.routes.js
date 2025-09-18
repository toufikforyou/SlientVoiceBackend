import express from "express";
import userController from "../controllers/user.controller.js";
import {
  validateUidBody,
  validateUidParam,
} from "../validators/user.validation.js";
import validatorService from "../../../services/validator.valided.service.js";

const router = express.Router();

router.post(
  "/",
  validateUidBody,
  validatorService,
  userController.createUser
);

router.get(
  "/:uid",
  validateUidParam,
  validatorService,
  userController.getUserByUid
);

router.delete(
  "/:uid",
  validateUidParam,
  validatorService,
  userController.deleteUser
);

export default router;
