import dotenv from 'dotenv';

dotenv.config();

console.log("DB_URI from .env:", process.env.DB_URI); // Add this line

export const envConfig = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default_access_secret' ,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_access_secret',
};
