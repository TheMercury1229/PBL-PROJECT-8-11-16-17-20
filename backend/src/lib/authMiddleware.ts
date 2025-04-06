import { NextFunction, Request,RequestHandler,Response } from "express";
import jwt from "jsonwebtoken";
import envObj from "../config/config";

export const authMiddleware  =   (req:Request, res: Response , next : NextFunction) : void => {
  try {
    const token = req.cookies?.jwt;
    console.log("token", token);
    if (!token) {
      console.log("no coookie");
      res.status(401).json({ data: null, message: "UNAUTHORIZED USER: No Token Found" });
      return;
    }
    const decoded  = jwt.verify(token, envObj.JWT_SECRET!) as { id: string }
    req.headers['userId'] = decoded.id;
    next();
  } catch (error) {
    res.status(404).json({data : null, message : "UNAUTHORIZED USER"})
  }
};
