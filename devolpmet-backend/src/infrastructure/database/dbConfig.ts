import mongoose from 'mongoose';
import { DATABASE_URL } from '../constants/env';
export const connectDB = async () => {
  try {
      const connect = await mongoose.connect(DATABASE_URL);
      console.log('Database connected');
  } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
  }
};
