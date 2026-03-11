import e, { Router } from "express";
import {
  loginUsers,
  logoutUsers,
  registerUsers,
} from "../controllers/users.controller";
import { auth, nonAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", nonAuth, loginUsers);
router.post("/logout", auth, logoutUsers);
router.post("/register", nonAuth, registerUsers);

export default router;
