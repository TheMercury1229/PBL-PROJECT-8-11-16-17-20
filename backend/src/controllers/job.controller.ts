import { Request, RequestHandler, Response } from "express";
import db from "../config/db";
// import { MLJobType , MLSkillType } from "@prisma/client";
import { MLJobType, MLSkillsType } from "../types/types";

type Output = {
  job: MLJobType;
  skills: MLSkillsType[];
};
export const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }

    const jobRecruiter = db.jobRecruiter.findUnique({
      where: {
        id: userId as string,
      },
    });
    if (!jobRecruiter) {
      res
        .status(404)
        .json({ data: null, message: "you are not job recruiter" });
    }
    const {} = req.body;
  } catch (error) {
    res.status(404).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
  }
};

export const read: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }
    // Find the job recruiter
    const jobRecruiterUser = db.jobRecruiter.findUnique({
      where: {
        userId: userId as string,
      },
    });
    //
    if (!jobRecruiterUser) {
      res
        .status(404)
        .json({ data: null, message: "you are not job recruiter" });
    }
    console.log(jobRecruiterUser);
    const findJobs = await db.jobRecruiter.findMany({
      select: {
        recruiterJobs: true,
      },
    });
    console.log(findJobs);
    res.json({ data: findJobs, message: "Jobs fetched" });
  } catch (error) {
    res.status(404).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
  }
};

export const getJobTitlesAndSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    let output: Output[] = [];
    const jobs = await db.mLJob.findMany();
    for (var i = 0; i < jobs.length; i++) {
      const skills = await db.mLSkill.findMany({
        where: {
          mlJobId: jobs[i].id,
        },
      });
      const job = {
        title: jobs[i].title,
        description: jobs[i].description as string,
      };
      const skillsArray = skills.map((value, index) => {
        return { name: value.name };
      });
      output.push({ job, skills: skillsArray });
    }
    res.json({ data: output });
  } catch (error) {}
};
