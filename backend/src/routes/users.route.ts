import { Router } from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  getUserInfo,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getTasksByUserId,
} from "../controllers/users.controller";
import { auth, nonAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../schemas/users.schema";

const router = Router();

router.post("/", nonAuth, validate(registerSchema), registerUser);
router.get("/", auth, getAllUsers);
router.get("/me", auth, getUserInfo);
router.get("/:id", auth, getUserById);
router.put("/", auth, validate(updateUserSchema), updateUser);
router.delete("/", auth, deleteUser);
router.post("/login", nonAuth, validate(loginSchema), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/:id/tasks", getTasksByUserId);

export default router;
