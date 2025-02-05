import { NextFunction, Request, RequestHandler, Response } from "express";

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    success: true,
    message: "User registered successfully",
  });
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User logged in successfully",
  });
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User logged out successfully",
  });
};
