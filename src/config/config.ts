import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME ?? 'localhost';
const SERVER_PORT = process.env.SERVER_PORT ?? 4000;

const DB_NAME = process.env.DB_USERNAME ?? 'fintonic';
const DB_USERNAME = process.env.DB_USERNAME ?? 'localDeveloper';
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'localDeveloper';
const DB_HOST = process.env.DB_HOST ?? '127.0.0.1:27017';

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
    connectionString: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    options: DB_OPTIONS,
  },
};
