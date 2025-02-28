import { Response } from "express";
import jwt from "jsonwebtoken";
import envObj from "../config/config";

export const createTokenAndSetCookie = async (id: string, res: Response) => {
  const token = await jwt.sign({ id: id }, envObj.JWT_SECRET!, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    httpOnly: true, //Prevents XSS attacks
    sameSite: "strict", //CSRF attack
    secure: process.env.NODE_ENV !== "development",
  });
};
