import { NextFunction, Request,RequestHandler,Response } from "express";
import jwt from "jsonwebtoken";
import envObj from "../config/config";

export const authMiddleware  =   (req:Request, res: Response , next : NextFunction) : void => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
        res.status(401).json({ data: null, message: "UNAUTHORIZED USER: No Token Found" });
    }
    const decoded = jwt.verify(token, envObj.JWT_SECRET!);
    req.headers['userId'] = decoded as string;
    next();
  } catch (error) {
    res.status(404).json({data : null, message : "UNAUTHORIZED USER"})
  }
};
