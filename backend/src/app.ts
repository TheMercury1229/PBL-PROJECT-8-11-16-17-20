import type { Request, Response, NextFunction } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import jobRouter from "./routes/job.route";
import userRouter from "./routes/users.route";
const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);

//Error handling middleware

app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
  // error handling code here
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const statusCode = (err as any).statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}) as (err: Error, req: Request, res: Response, next: NextFunction) => void);
export default app;
