import express from 'express';
import cors from "cors"
import { envConfig } from '../src/config/envConfig';
import { connectDB } from '../src/infrastructure/database/dbConfig';
import userRoutes from '../src/infrastructure/http/routes/userRoutes';

import cookieParser from 'cookie-parser';
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(authMiddleware)
// CORS configuration
app.use(cors({
  origin: 'http://localhost:5174', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(envConfig.PORT, () => {
    console.log(`Server running on port ${envConfig.PORT}`);
  });
};

startServer();


