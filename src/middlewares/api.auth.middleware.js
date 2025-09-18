import ApiResponse from "../models/api.response.model.js";
import verifyApiToken from "../utils/api.auth.util.js";

export default (req, _, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    throw new ApiResponse.Error(403, "Unauthorized API token");
  }

  const payload = verifyApiToken(apiKey);

  if (!payload) {
    throw new ApiResponse.Error(403, "Unauthorized API token");
  }

  next();
};
