import { Router } from "express";
import {
  create,
  getRecommendedJobs,
  read,
} from "../controllers/users.controller";
import { authMiddleware } from "../lib/authMiddleware";

const userRouter = Router();

userRouter.get("/get-recommended-jobs", authMiddleware, getRecommendedJobs);
userRouter.get("/read", read);

export default userRouter;
