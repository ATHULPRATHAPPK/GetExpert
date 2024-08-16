import jwt from "jsonwebtoken";
import { envConfig } from "../../../config/envConfig";
import { jwtInterface } from "../../../interface/serviceInterface/jwtInterface";

interface TokenPayload {
  userId: string;
}


const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envConfig;


export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  console.log("Reached access working...", typeof payload);
  return jwt.sign({ payload }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
