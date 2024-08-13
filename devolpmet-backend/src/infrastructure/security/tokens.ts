import jwt from "jsonwebtoken";
import { envConfig } from "../../config/envConfig";


interface TokenPayload {
  userId: string;
}
const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = envConfig.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  console.log("reached acees working...", typeof payload);
  return jwt.sign({ payload }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
