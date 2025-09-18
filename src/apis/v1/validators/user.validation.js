import { body, param } from "express-validator";

export const validateUidBody = [
  body("uid")
    .notEmpty()
    .withMessage("UID is required")
    .isString()
    .withMessage("UID must be a string"),
];

export const validateUidParam = [
  param("uid")
    .notEmpty()
    .withMessage("UID is required")
    .isString()
    .withMessage("UID must be a string"),
];
