import { Request, RequestHandler, Response } from "express";

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
