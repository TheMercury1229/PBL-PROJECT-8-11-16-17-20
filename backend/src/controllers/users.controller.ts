import type { Request, RequestHandler, Response } from "express";
import { TitleAndSkills } from "../types/types";
import db from "../config/db";
import { getUserById } from "../lib/getUserById";
import axios from "axios";
interface JobSearching {
  title: string;
  skills: string[];
  experience: string;
  location: string;
  preference: string;
}

interface PreferredJobOutput {
  recruiterjobid: string;
  job_title: string,
  skills: string;
  salary_range: string;
  location: string;
  preference: string,
  experience: string
}

export const create: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User created successfully",
  });
};

export const read: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User read successfully",
  });
};

export const setPreferredJob: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { titleAndSkills }: { titleAndSkills: TitleAndSkills[] } = req.body; //titleAndSkills is an array of TitleAndSkills
    const userId = req.headers["userId"] as string;
    const user = getUserById(userId);
    if (!user) {
      res.status(400).json({ data: false, message: "USER_NOT_FOUND" });
      return;
    }
    const jobSeeker = await db.jobSeeker.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!jobSeeker) {
      res.status(400).json({ data: false, message: "JOB_SEEKER_NOT_FOUND" });
      return;
    }
    console.log(titleAndSkills);
    await db.$transaction(async (tx) => {
      for (var i = 0; i < titleAndSkills.length; i++) {
        const { title, skills } = titleAndSkills[i];
        const mlJob = await tx.mLJob.findFirst({
          where: {
            title: title,
          },
        });
        if (!mlJob) {
          res.status(400).json({ data: false, message: "ML_JOB_NOT_FOUND" });
          return;
        }
        const mlSkills = await tx.mLSkill.findMany({
          where: {
            name: {
              in: skills,
            },
            mlJobId: mlJob.id,
          }
        });
        console.log("ml Skills");
        console.log(mlSkills);
        if (mlSkills.length !== skills.length) {
          res.status(400).json({ data: false, message: "ML_SKILLS_NOT_FOUND" });
          return;
        }
        const preferredJob = await tx.preferredJob.create({
          data: {
            jobSeekerId: jobSeeker.id,
            mlJobId: mlJob.id,
          },
        });
        await tx.userSkillMapping.createMany({
          data: mlSkills.map((skill) => {
            return {
              jobSeekerId: jobSeeker.id,
              skillId: skill.id,
              preferredJobId: preferredJob.id,
            };
          }),
        });
      }
    });
    res
      .status(200)
      .json({ data: true, titleAndSkills, message: "PREFERRED_JOB_SET_SUCCESSFULLY" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
    return;
  }
};


export const getPreferredJob: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.headers["userId"] as string;
  console.log(userId);
  const user = await getUserById(userId);
  if (!user) {
    res.status(400).json({ data: false, message: "USER_NOT_FOUND" });
    return;
  }
  console.log(user);
  const jobSeeker = await db.jobSeeker.findFirst({
    where: {
      userId: userId,
    },
  });
  if (!jobSeeker) {
    res.status(400).json({ data: false, message: "JOB_SEEKER_NOT_FOUND" });
    return;
  }

  const preferredJobs = await db.preferredJob.findMany({
    where: {
      jobSeekerId: jobSeeker.id,
    },
    include: {
      skills: {
        select: {
          skill: {
            select: {
              name: true
            }
          }
        }
      },
      mlJob: {
        select: {
          title: true
        }
      }
    },
  });

  const object = await db.jobSeeker.findUnique({
    where: {
      userId: userId,
    },
    select: {
      gender: true,
      education: true,
      experience: true,
      location: true,
    }
  })

  const data: JobSearching[] = preferredJobs.map((job) => {
    return {
      title: job.mlJob.title,
      skills: job.skills.map((skill) => skill.skill.name),
      experience: object?.experience || "",
      location: object?.location || "",
      preference: object?.gender as string
    }
  });

  let output: PreferredJobOutput[] = [];

  for (let i = 0; i < data.length; i++) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend-job", {
        skills: data[i].skills,
        experience: data[i].experience,
        location: data[i].location,
        preference: data[i].preference,
      });

      const recommended: PreferredJobOutput[] = response.data.recommended_jobs;

      for (const job of recommended) {
        // assuming job has a `title` or some unique identifier
        const alreadyExists = output.some((existingJob) => existingJob.recruiterjobid === job.recruiterjobid);

        if (!alreadyExists) {
          output.push(job);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ data: null, message: "ERROR RETRIEVING FROM ML" });
    }
  }
  res.status(200).json({ data: output, message: "THESE ARE THE JOBS" });

}


