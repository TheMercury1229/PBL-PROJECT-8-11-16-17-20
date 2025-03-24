import { Router } from "express";
import { create, read, setPreferredJob } from "../controllers/users.controller";
import { authMiddleware } from "../lib/authMiddleware";
import { me } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.get("/create", create);
userRouter.post("/set-preferred-job", authMiddleware, setPreferredJob);
userRouter.get("/read", read);


export default userRouter;
