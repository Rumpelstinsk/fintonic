import { config } from '@config/index';
import { Logger } from '@shared/logger';
import mongoose from 'mongoose';

export const initDB = (logger: Logger) => {
  const currentConfig = config();

  return mongoose
    .connect(currentConfig.db.connectionString, currentConfig.db.options)
    .then(db => {
      logger.info('Connected to mongo');
      return db;
    })
    .catch(error => {
      logger.error(error);
    });
};
