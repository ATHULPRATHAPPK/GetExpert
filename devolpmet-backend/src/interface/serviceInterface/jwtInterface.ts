import { JwtPayload } from "jsonwebtoken";

export interface jwtInterface{
    generateToken(payload: object, expiresIn: string | number): string;
    verifyToken(token: string): any;
    verifyRefreshToken(token: string): JwtPayload | null;
}
