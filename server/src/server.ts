import express, { Application } from 'express';
import userRoutes from './routes/api';
import healthRoutes from './routes/healthz';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

export const startServer = () => {
  const app: Application = express();

  // Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // API routes
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/health', healthRoutes);
  const frontendBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(frontendBuildPath));

  // Global error handler (optional)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('❌ Global Error:', err.stack || err.message);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};
