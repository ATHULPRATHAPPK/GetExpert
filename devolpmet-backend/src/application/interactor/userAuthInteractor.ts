import { jwtOutput } from "../services/jwt";
import { IUserRepo } from "../../interface/userInterface/IUserRepo";
import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";
import { IAuthMiddlewareInteractor } from "../../interface/IAuthMiddleware";

export class UserAuthIntractor implements IAuthMiddlewareInteractor {
  private jwt: jwtInterface;
  private repository: IUserRepo;

  constructor(jwt: jwtInterface, repository: IUserRepo) {
    this.jwt = jwt;
    this.repository = repository;
  }

  async newAccessToken(userId: string): Promise<string> {
    try {
      // Generate a new access token with a specific expiration time
      const newToken = this.jwt.generateToken({ id: userId }, '1h'); // Set expiration as 1 hour
      return newToken;
    } catch (error) {
      console.error("Error generating new access token:", error);
      throw new Error("Failed to generate new access token.");
    }
  }

   decryptToken(accessToken: string): Promise<jwtOutput> {
    try {
      return this.jwt.verifyToken(accessToken);
    } catch (error) {
      console.error("Error decrypting token:", error);
      throw new Error("Failed to decrypt token.");
    }
  }
}
