import { Request, Response, NextFunction } from 'express';
import { envConfig } from '../../../config/envConfig';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = envConfig.REFRESH_TOKEN_SECRET


export const verifyToken = (accessToken: string, refreshToken: string) => {
    try {
        console.log("access Token", accessToken);
        try {
            const accessTokenVerify = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as { id: string };
            return { success: true, decoded: accessTokenVerify };
        } catch (accessTokenError) {
            if (!refreshToken) {
                throw new Error('Refresh token not provided');
            }           
            console.log("refresh Token", refreshToken);
            try {
                const refreshTokenVerify = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: string };
                console.log("refreshTokenVerify",refreshTokenVerify);              
                const newAccessToken = jwt.sign({ id: refreshTokenVerify.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });             
                return { success: true, newAccessToken };
            } catch (refreshTokenError) {
                console.error('Refresh token verification error:', refreshTokenError);
                return { success: false };
            }
        }
    } catch (error) {
        console.error('Token verification error:', error);
        return { success: false };
    }
};