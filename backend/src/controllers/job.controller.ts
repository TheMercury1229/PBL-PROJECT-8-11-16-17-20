import { Request, RequestHandler, Response } from "express";
import db from "../config/db";
// import { MLJobType , MLSkillType } from "@prisma/client";
import { MLJobType, MLSkillsType, RecruiterJob } from "../types/types";
import { describe } from "node:test";
import { Preferance } from "@prisma/client";

type Output = {
  job: MLJobType,
  skills: string
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

    const { title, latitude , longitude , location , qualifications , experience , preferance , skills} = req.body;
    if(!title || !latitude || !longitude || !location || !qualifications || !experience || !preferance || !skills){
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

    try {
      await db.$transaction(async (tx)=>{
        const recruiterJob = await tx.recruiterJob.create({
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
        const mlSkills = await tx.mLSkill.findMany({
          where: {
            name : {
              in : skills
            },
            mlJobId : mlJob?.id
          }
        });
        console.log(mlSkills);
        if(mlSkills.length !== skills.length){
          throw new Error("SOME SKILLS ARE NOT AVAILABLE");
        }
        for(var i = 0 ;i<mlSkills.length;i++){
          await tx.recruiterSkills.create({
            data: {
              recruiterJobId: recruiterJob.id,
              skillId: mlSkills[i].id
            }
          });
        }
      })
    } catch (error) {
      if(error instanceof Error){
        res.status(404).json({ data: null, message: (error as Error).message || "INTERNAL SERVER ERROR" });
        return;
      }
      res.status(404).json({ data: null, message: "INTERNAL SERVER ERROR" });
      return;
    }
    
    res.json({ data: true, message: "JOB POSTED SUCCESSFULLY" });
    return;

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
      let skillString = "";
      for(var j = 0 ; j<skills.length;j++){
        skillString += skills[j].name + " ";  
      }
      output.push({ job, skills: skillString });
    }
    res.json({ data: output });
  } catch (error) {

  }
};
