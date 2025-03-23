import type { Request, RequestHandler, Response } from "express";
import db from "../config/db";

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

export const getRecommendedJobs: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      res.status(404).json({ data: null, message: "UNAUTHORIZED USER" });
    }
    // Find the job seeker
    const jobSeekerUser = db.jobSeeker.findUnique({
      where: {
        userId: userId as string,
      },
    });
  } catch (error) {
    res.status(404).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
  }
};
