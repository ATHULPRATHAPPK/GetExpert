import express from 'express';
import { envConfig } from '../../config/envConfig';
import { connectDB } from '../database/dbConfig';
// import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(envConfig.PORT, () => {
    console.log(`Server running on port ${envConfig.PORT}`);
  });
};

startServer();
