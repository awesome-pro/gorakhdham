import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { config } from './config';
import { apiRoutes } from './routes';


const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
});
app.use('/api', limiter);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// API Routes
app.use('/api/v1', apiRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };