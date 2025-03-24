import { Router } from "express";
import {
  login,
  logout,
  me,
  onboard,
  onboardExtend,
  register,
} from "../controllers/auth.controller";
import { authMiddleware } from "../lib/authMiddleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/onboard", onboard);
authRouter.post("/logout", logout);
authRouter.post("/onboard-extend", authMiddleware, onboardExtend);
authRouter.get("/me", authMiddleware, me);

export default authRouter;
