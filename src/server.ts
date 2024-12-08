import { app } from './app';
import { logger } from './utils/logger';
import { config } from './config';

const startServer = () => {
  try {
    const server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
      logger.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        logger.info('💥 Process terminated!');
      });
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();