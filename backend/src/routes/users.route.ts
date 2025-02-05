import { Router } from "express";
import { create, read } from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/create", create);
userRouter.get("/read", read);

export default userRouter;
