import { Request, RequestHandler, Response } from "express";

export const create: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Job created successfully",
  });
};

export const read: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Job read successfully",
  });
};
