import jwt from "jsonwebtoken";

export default (apiKey) => {
  try {
    const apiKeyPayload = jwt.verify(apiKey, process.env.JWT_API_SECRET, {
      complete: true,
    });

    if (!apiKeyPayload) return null;

    return true;
  } catch (error) {
    return null;
  }
};
