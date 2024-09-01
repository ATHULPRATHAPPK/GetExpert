import exp from 'constants';
import { envConfig } from '../../config/envConfig';
export const getEnv = (key: keyof typeof envConfig, defaultValue?: string): string => {
    const value = envConfig[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing env variable ${key}`);
    }
    return value;
};

export const DATABASE_URL = getEnv("DB_URI");
export const PORT = getEnv("PORT");
export const JWT_PRIVATE_KEY = getEnv('JWT_SECRET');
export const JWT_PUBLIC_KEY = getEnv('JWT_SECRET');

export const  CLOUD_NAME = getEnv("CLOUD_NAME");
export const  CLOUD_API_KEY = getEnv("CLOUD_API_KEY");
export const  CLOUD_API_SECTRET = getEnv("CLOUD_API_SECTRET");
export const  CLOUDINARY_URL = getEnv("CLOUDINARY_URL");

