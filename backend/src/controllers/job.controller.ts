import { Request, RequestHandler, Response } from "express";
import db from "../config/db";
// import { MLJobType , MLSkillType } from "@prisma/client";
import { MLJobType, MLSkillsType, RecruiterJob } from "../types/types";
import { describe } from "node:test";
import { Preferance } from "@prisma/client";

type Output = {
  job: MLJobType,
  skills: MLSkillsType[]
}
export const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['userId'];
    if (!userId) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId as string
      }
    });

    if (!user) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }
    const jobRecruiter = await db.jobRecruiter.findUnique({
      where: {
        userId: userId as string
      }
    });
    if (!jobRecruiter) {
      res.status(404).json({ data: null, message: "YOU ARE NOT JOB RECRUITER" });
    }

    const { title, latitude , longitude , location , qualifications , experience , preferance} = req.body;
    if(!title || !latitude || !longitude || !location || !qualifications || !experience || !preferance){
      res.status(404).json({ data: null, message: "PLEASE PROVIDE ALL DETAILS" });
    }
    const mlJob = await db.mLJob.findFirst({
      where: {
        title: title
      } 
    });
    if (!mlJob) {
      res.status(404).json({ data: null, message: "NO SUCH JOB AVAILABLE" });
    }

    const recruiterJob = await db.recruiterJob.create({
      data: {
        latitude: latitude,
        longitude: longitude,
        location: location,
        qualifications: qualifications,
        experience: experience,
        mlJobId : mlJob?.id as string,
        preferance : preferance as Preferance,
        jobRecruiterId : jobRecruiter?.id as string
      }
    });
    res.json({ data: recruiterJob, message: "JOB POSTED SUCCESSFULLY" });

  } catch (error) {
    res.status(404).json({ data: false, message: "INTERNAL_SERVER_ERROR" })
  }
};

export const read: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }
    // Find the job recruiter
    const jobRecruiter = db.jobRecruiter.findUnique({
      where: {
        id: userId as string,
      },
    });
    //
    if (!jobRecruiter) {
      res
        .status(404)
        .json({ data: null, message: "you are not job recruiter" });
    }
  } catch (error) {}
};

export const getJobTitlesAndSkills: RequestHandler = async (req: Request, res: Response) => {
  try {
    let output: Output[] = [];
    const jobs = await db.mLJob.findMany();
    for (var i = 0; i < jobs.length; i++) {
      const skills = await db.mLSkill.findMany({
        where: {
          mlJobId: jobs[i].id
        }
      });
      const job = { title: jobs[i].title, description: jobs[i].description as string };
      const skillsArray = skills.map((value, index) => {
        return { name: value.name }
      });
      output.push({ job, skills: skillsArray });
      output.push({ job, skills: skillsArray });
    }
    res.json({ data: output });
  } catch (error) {

  }
};
