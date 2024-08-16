import {  jwtOutput } from "../application/services/jwt";

export interface IAuthMiddlewareInteractor {
  decryptToken(accessToken: string): Promise<jwtOutput>;
  newAccessToken(data: string): Promise<string>;
}