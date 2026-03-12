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
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema";

const router = express.Router();

router.post("/", auth, validate(createTaskSchema), createTask);
router.get("/", getAllTasks);
router.get("/my-tasks", auth, getMyTasks);
router.get("/:id", getTaskById);
router.put("/:id", auth, validate(updateTaskSchema), updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
