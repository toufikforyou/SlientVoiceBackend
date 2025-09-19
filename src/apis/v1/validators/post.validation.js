import { body } from "express-validator";

export const validatePostBody = [
  body("uid").optional().isString().withMessage("UID must be a string"),

  body("desc")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array")
    .custom((value) => {
      if (!value.every((item) => typeof item === "string")) {
        throw new Error("All images must be url strings");
      }
      return true;
    }),
];
