import express from "express";
import {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";
import { auth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../utils/zod";

const router = express.Router();

router.post("/tasks", auth, validate(createTaskSchema), createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/my-tasks", auth, getMyTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", auth, validate(updateTaskSchema), updateTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
