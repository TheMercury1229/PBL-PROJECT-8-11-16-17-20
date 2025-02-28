import dotenv from "dotenv";
dotenv.config();

const envVar = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

const envObj = Object.freeze(envVar);

export default envObj;
