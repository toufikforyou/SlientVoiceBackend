import { validationResult } from "express-validator";
import ApiResponse from "../models/api.response.model.js";

export default (req, _, next) => {
  const errors = validationResult(req).formatWith(({ msg, param }) => {
    return { param, msg };
  });
  if (!errors.isEmpty()) {
    throw new ApiResponse.Error(400, "Input error", errors.array());
  }
  next();
};
