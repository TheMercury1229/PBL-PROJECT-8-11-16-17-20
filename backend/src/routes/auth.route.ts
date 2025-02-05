import { Request, Response, Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/register", register);
authRouter.get("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
