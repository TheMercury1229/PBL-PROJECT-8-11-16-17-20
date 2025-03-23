import { Router } from "express";
import {
  create,
  getJobTitlesAndSkills,
  read,
} from "../controllers/job.controller";
// import { addData, addSkills } from "../controllers/addData";
import { authMiddleware } from "../lib/authMiddleware";

const jobRouter = Router();
jobRouter.get("/postJob", create);
jobRouter.get("/getAllJob", authMiddleware, read);

//in the middleware the req.headers['userId'] = userId
jobRouter.get(
  "/getAllJobTitlesWithSkills",
  authMiddleware,
  getJobTitlesAndSkills
);

// jobRouter.post("/putJob" , addData);
// jobRouter.post("/putSkill" , addSkills);

export default jobRouter;
