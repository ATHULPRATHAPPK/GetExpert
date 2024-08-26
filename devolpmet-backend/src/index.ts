import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { connectDB } from './infrastructure/database/dbConfig';
import { PORT } from './infrastructure/constants/env';
import userRoutes from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import techRouter from './routes/techRoutes'

// Load environment variables
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    const app = express();

    // Middleware
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // CORS configuration
    app.use(cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
      credentials: true,
    }));

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/admin',adminRouter)
    app.use('/api/tech',techRouter)


    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error', 
        error: err.message, 
      });
    });


    app.listen(PORT, () => {
      console.log(`Server active on port: ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Start the server
startServer();
