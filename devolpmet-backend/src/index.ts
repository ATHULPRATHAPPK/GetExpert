import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { connectDB } from './infrastructure/database/dbConfig';
import { PORT } from './infrastructure/constants/env';
import userRoutes from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';

// Load environment variables
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    // Connect to the database
    await connectDB();

    // Create an instance of Express
    const app = express();

    // Middleware
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // CORS configuration
    app.use(cors({
      origin: 'http://localhost:5173', // Allow requests from this origin
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      credentials: true,
    }));

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/admin',adminRouter)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server active on port: ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Start the server
startServer();
