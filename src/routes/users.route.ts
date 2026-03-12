import { Router } from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getTasksByUserId,
} from "../controllers/users.controller";
import { auth, nonAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, updateUserSchema } from "../utils/zod";

const router = Router();

router.post("/", nonAuth, validate(registerSchema), registerUser);
router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/", auth, validate(updateUserSchema), updateUser);
router.delete("/", auth, deleteUser);
router.post("/login", nonAuth, loginUser);
router.post("/logout", auth, logoutUser);
router.get("/:id/tasks", getTasksByUserId);

export default router;
