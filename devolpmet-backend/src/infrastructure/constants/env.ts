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
