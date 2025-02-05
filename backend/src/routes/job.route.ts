import { Router } from "express";
import { create, read } from "../controllers/job.controller";

const jobRouter = Router();

jobRouter.get("/create", create);
jobRouter.get("/read", read);

export default jobRouter;
