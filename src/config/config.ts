import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const ENVIROMENT = process.env.ENVIROMENT ?? 'development';

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME ?? 'localhost';
const SERVER_PORT = process.env.SERVER_PORT ?? 4000;

const DB_NAME = process.env.DB_USERNAME ?? 'fintonic';
const DB_USERNAME = process.env.DB_USERNAME ?? 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'admin';
const DB_HOST = process.env.DB_HOST ?? 'localhost:27017';

const DB_OPTIONS: mongoose.ConnectOptions = {
  autoIndex: false,
  keepAlive: true,
};

export const config = {
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
  db: {
    connectionString:
      ENVIROMENT === 'development'
        ? 'mongodb://localhost:27017/dev?authSource=admin'
        : `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    options: DB_OPTIONS,
    name: DB_NAME,
    username: DB_NAME,
    password: DB_PASSWORD,
    host: DB_HOST,
  },
};
