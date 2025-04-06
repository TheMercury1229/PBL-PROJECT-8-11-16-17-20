import type { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import db from "../config/db";
import { createTokenAndSetCookie } from "../lib/createTokenAndSetCookie";
import { UserGender, UserRole } from "@prisma/client";
import envObj from "../config/config";
import jwt from "jsonwebtoken";
import { getUserById } from "../lib/getUserById";
// /api/auth/register -> POST
export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("reached here");
    const { email, password, fullName, mobile, role } = await req.body;
    // Check if all the fields are provided
    if (!email || !password || !fullName || !mobile || !role) {
      res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
      return;
    }
    //Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
      return;
    }
    // Validate password
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password should be atleast 6 characters",
      });
      return;
    }
    // Validate mobile
    if (mobile.length < 10) {
      res.status(400).json({
        success: false,
        message: "Mobile number should be atleast 10 characters",
      });
      return;
    }

    // Check if the email is already in the db
    const findUserInDb = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (findUserInDb) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create the user in the db
    // const user = await db.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     fullName,
    //     mobile,
    //     role:
    //       role === "JOB_SEEKER" ? UserRole.JOB_SEEKER : UserRole.JOB_RECRUITER,
    //   },
    // });
    
    const user = await db.$transaction(async (tx)=>{
      const user = await tx.user.create({
        data : {
          email , 
          password : hashedPassword,
          fullName,
          mobile,
          role : role === "JOB_SEEKER" ? UserRole.JOB_SEEKER : UserRole.JOB_RECRUITER
        }
      })
      if(role == "JOB_RECRUITER"){
        await tx.jobRecruiter.create({
          data : {
            userId : user.id
          }
        })
      }
      return user;
    })

    
    
    await createTokenAndSetCookie(user.id, res);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log("Error occurred in register controller: ", error);
    next(error);
  }
};

// /api/auth/login -> POST
export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }
    // Find the user in the db
    const findUserInDb = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUserInDb) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUserInDb.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    // Create a JWT token
    await createTokenAndSetCookie(findUserInDb.id, res);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        id: findUserInDb.id,
        email: findUserInDb.email,
        role: findUserInDb.role,
        fullName: findUserInDb.fullName,
        mobile: findUserInDb.mobile,
      },
    });
  } catch (error) {
    console.log("Error occurred in login controller: ", error);
    next(error);
  }
};

// /api/auth/logout -> POST
export const logout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("logout hit")
    res.clearCookie("jwt")

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    next(error);
  }
};

// /api/auth/onboard -> POST
export const onboard: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, role, age, gender, education, experience , location } = req.body;

    if (!userId || !role) {
      res.status(400).json({
        success: false,
        message: "User ID and role are required",
      });
      return;
    }

    if (role === "JOB_RECRUITER") 
    {
      await db.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: userId },
          data: { role: UserRole.JOB_RECRUITER },
        });

        const existingRecruiter = await tx.jobRecruiter.findUnique({
          where: { userId },
        });

        if (!existingRecruiter) {
          await tx.jobRecruiter.create({
            data: { userId },
          });
        }
      });

      res.status(200).json({
        success: true,
        message: "Onboarded as Job Recruiter",
        data: {
          userId,
          role,
        },
      });
      await createTokenAndSetCookie(userId, res);
      return;
    }

    if (role === "JOB_SEEKER") {
      if (!age || !gender) {
        res.status(400).json({
          success: false,
          message: "Age and gender are required for job seekers",
        });
        return;
      }
      await db.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: userId },
          data: { role: UserRole.JOB_SEEKER },
        });

        const existingSeeker = await tx.jobSeeker.findUnique({
          where: { userId },
        });

        let jobSeekerId: string;
        const genderUser =
          gender === "MALE"
            ? UserGender.MALE
            : gender === "FEMALE"
            ? UserGender.FEMALE
            : UserGender.OTHER;
        if (!existingSeeker) {
          const newJobSeeker = await tx.jobSeeker.create({
            data: {
              userId,
              age,
              gender: genderUser,
              education: education,
              experience: experience,
              location: location,
            },
          });
          jobSeekerId = newJobSeeker.id;
        } else {
          jobSeekerId = existingSeeker.id;
        }

        // Create UserProfile if it doesn’t exist
        

      });
      await createTokenAndSetCookie(userId, res);

      res.status(200).json({
        success: true,
        message: "Onboarded as Job Seeker",
        data: {
          userId,
          role,
          age,
          gender,
          education,
          experience,
          location
        },
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: "Invalid role provided",
    });
    return;
  } catch (error) {
    console.error("Error in onboard controller:", error);
    next(error);
  }
};


// /api/auth/onboard-extend -> POST
export const onboardExtend: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.headers["userId"];
    if (!userId) {
      res.status(400).json({
        data: null,
        message: "User ID is required",
      });
    }
    const jobSeeker = db.jobSeeker.findUnique({
      where: {
        userId: userId as string,
      },
    });
    if (!jobSeeker) {
      res.status(400).json({
        data: null,
        message: "User is not a job seeker",
      });
    }
    const { skills, jobsPreffered } = req.body;
    if (!skills || !jobsPreffered) {
      res.status(400).json({
        data: null,
        message: "Skills and Jobs preferred are required",
      });
    }
  } catch (error) {
    res.status(400).json({ data: false, message: "INTERNAL_SERVER_ERROR" });
  }
};

export const me : RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userId"];
    const user = await getUserById(userId as string);
    if (!user) {
      res.status(400).json({ data: null, message: "USER_NOT_FOUND" });
      return;
    }
    console.log(user)
    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        mobile: user.mobile,
      },
      message: "USER_FOUND",
    });
  } catch (error) {
    res.status(404).json({data : null, message : "UNAUTHORIZED USER"})
  }
};
