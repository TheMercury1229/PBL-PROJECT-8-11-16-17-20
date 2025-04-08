import { Router } from "express";
import { applyForJob, create, getPreferredJob, read, setPreferredJob } from "../controllers/users.controller";
import { authMiddleware } from "../lib/authMiddleware";
import { me } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.get("/create", create);
userRouter.post("/set-preferred-job", authMiddleware, setPreferredJob);
userRouter.get("/read", read);
userRouter.get("/get-preferred-job", authMiddleware, getPreferredJob);
userRouter.post("/apply-job", authMiddleware, applyForJob);



export default userRouter;
