import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.route";
import tasksRoutes from "./routes/tasks.route";
import { corsConfig } from "./utils/cors";
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/not-found.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsConfig);

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(notFound);
app.use(errorHandler);

export default app;
