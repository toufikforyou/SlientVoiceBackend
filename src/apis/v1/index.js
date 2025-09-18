import { Router } from "express";
import ApiResponse from "../../models/api.response.model.js";

import userRoutes from "./routes/user.routes.js";

const router = Router();

router.get("/", (_, res) => {
  res.json(
    new ApiResponse.Success(200, "This is a version 1", {
      page: "Api version 1 home page",
    })
  );
});

router.use("/users", userRoutes);

router.use(() => {
  throw new ApiResponse.Error(404, "API version 1 route not found!");
});

export default router;
