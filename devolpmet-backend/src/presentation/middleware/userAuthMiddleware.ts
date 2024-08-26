import { IAuthMiddlewareInteractor } from "../../interface/IAuthMiddleware";
import { NextFunction, Request, Response } from "express";
import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";

interface authReqInput {
  accessToken: string;
  refreshToken: string;
}

export class userAuthMiddleware {
  private authInteractor: IAuthMiddlewareInteractor;
  private jwt: jwtInterface;
  constructor(interactor: IAuthMiddlewareInteractor, jwt: jwtInterface) {
    this.authInteractor = interactor;
    this.jwt = jwt;
  }

  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    console.log("hello..");
    
    try {
      const { accessToken, refreshToken } = req.cookies;
      console.log(accessToken, refreshToken, "accessTokenaccessToken");
      const result = this.jwt.verifyToken(accessToken);
      if (result.payload) {
        console.log("Token is valid. User details:", result.payload);
        return next();
      } else {
        const refreshTokenResult = this.jwt.verifyRefreshToken(refreshToken);
        if (refreshTokenResult) {
          const newId = refreshTokenResult.id;
          const newAccessToken = this.jwt.generateToken({ id: newId }, "1h");
          const newRefreshToken = this.jwt.generateToken({ id: newId }, "30d");
          console.log("new tokens  created...");
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
          });
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
          });
          return next();
        } else {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid refresh token." });
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during authentication." });
    }
  }
}
