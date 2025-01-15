import dotenv from "dotenv";
dotenv.config();

const envVar = {
  PORT: process.env.PORT,
};

const envObj = Object.freeze(envVar);

export default envObj;
