import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/Getexpert',
  JWT_SECRET: process.env.JWT_SECRET || 'GetExpert',
  EMAIL_USER:"testpurpose656@gmail.com",
  EMAIL_PASS:"vjly sgtc opxp xyyi"
};
