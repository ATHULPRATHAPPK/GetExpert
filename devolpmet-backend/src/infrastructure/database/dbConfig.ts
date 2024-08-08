import mongoose from 'mongoose';
import { envConfig } from '../../config/envConfig';

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.DB_URI);
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};
