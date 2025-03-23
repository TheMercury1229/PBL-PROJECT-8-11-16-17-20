import type { Request, RequestHandler, Response } from "express";
import { TitleAndSkills } from "../types/types";
import db from "../config/db";
import { getUserById } from "../lib/getUserById";
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
          },
        });
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
      .json({ data: true, message: "PREFERRED_JOB_SET_SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
  }
};
