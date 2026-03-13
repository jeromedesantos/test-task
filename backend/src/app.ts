import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.route";
import tasksRoutes from "./routes/tasks.route";
import { corsConfig } from "./utils/cors";
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/not-found.middleware";

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.BASE_URL || "http://localhost:3000";

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

app.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝
    
    𝗟𝗼𝗰𝗮𝗹: ${URL}
    `),
);
