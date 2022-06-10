import 'reflect-metadata';
import 'module-alias/register';
import express, { NextFunction, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container, initDI } from './inversify.dependencies';
import mongoose from 'mongoose';

// Dependencies
initDI();

// DATABASE
mongoose
  .connect(config.db.connectionString, config.db.options)
  .then(() => {
    console.log('Connected to mongo');
  })
  .catch(error => {
    console.error({ error });
  });

// API
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

// Server
const appConfigured = server.build();
appConfigured.listen(config.server.port, () => {
  console.log('Pendiende crear el logger de DI');
});
