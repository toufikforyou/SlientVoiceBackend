import express from "express";
import path from "path";
import setHeader from "./utils/header.utils.js";
const app = express();

app.use("/robots.txt", (req, res) => {
  res.sendFile(path.resolve("robots.txt"));
});

app.use("/404", async (req, res) => {
  res.status(404).send("Route not found!").end();
});

app.use(setHeader);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Import
import apiRouter from "./apis/index.js";
import { errorHandler } from "./middlewares/api.error.middleware.js";

// Route Destination
app.use("/api", apiRouter);

app.use((_, res) => {
  res.redirect("/404");
});

// Api Error Middleware
app.use(errorHandler);

export default app;
