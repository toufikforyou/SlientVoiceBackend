import { body } from "express-validator";

export const validateCommentBody = [
  body("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .isString()
    .withMessage("Comment must be a string")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 and 500 characters"),
];