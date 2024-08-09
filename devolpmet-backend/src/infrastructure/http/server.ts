import express from 'express';
import cors from "cors"
import { envConfig } from '../../config/envConfig';
import { connectDB } from '../database/dbConfig';
import userRoutes from './routes/userRoutes';
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
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


