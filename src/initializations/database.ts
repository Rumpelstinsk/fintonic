import { config } from '@config/index';
import { Logger } from '@shared/logger';
import mongoose from 'mongoose';

export const initDB = (logger: Logger) => {
  mongoose
    .connect(config.db.connectionString, config.db.options)
    .then(() => {
      logger.info('Connected to mongo');
    })
    .catch(error => {
      logger.error(error);
    });
};
