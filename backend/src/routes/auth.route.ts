import { Router } from "express";
import { login, logout, onboard, register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/onboard", onboard);
authRouter.post("/logout", logout);

export default authRouter;
