import express, { NextFunction, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.dependencies';
import mongoose from 'mongoose';

// DATABASE
mongoose
  .connect(config.db.connectionString, config.db.options)
  .then(() => {
    console.log('Connected to mongo');
  })
  .catch(() => {
    console.error('Unable to conect to mongo');
  });

const router = express();
const server = new InversifyExpressServer(container, null, { rootPath: '/' }, router);

router.use((_req, res: Response, next: NextFunction) => {
  console.log('Pendiende crear el logger de DI');
  //req.method, req.url req.socket.remoteAddress

  res.on('finish', () => {
    console.log('Pendiende crear el logger de DI');
    // req.method, req.url, req.remoteAddress, res.statusCode
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Errors
router.use((_req, res, _next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

// Server
const appConfigured = server.build();
appConfigured.listen(config.server.port, () => {
  console.log('Pendiende crear el logger de DI');
});
