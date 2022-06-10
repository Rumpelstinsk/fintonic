import { config } from '@config/index';
import { Logger } from '@shared/logger';
import mongoose from 'mongoose';

export const initDB = (logger: Logger) => {
  return mongoose
    .connect(config.db.connectionString, config.db.options)
    .then(db => {
      logger.info('Connected to mongo');
      return db;
    })
    .catch(error => {
      logger.error(error);
    });
};
