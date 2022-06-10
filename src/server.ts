import 'reflect-metadata';
import 'module-alias/register';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from './config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container, initDI } from './inversify.dependencies';
import { Logger } from './shared';
import { MODULE_TYPES } from './constants';
import { initDB } from './initializations';

// Dependencies
initDI();
const logger = container.get<Logger>(MODULE_TYPES.SHARED.Logger);

// DB
initDB(logger);

// API
const router = express();
const server = new InversifyExpressServer(container, null, { rootPath: '/' }, router);

router.use(({ method, url, socket, params, query }: Request, res: Response, next: NextFunction) => {
  logger.info('Request received', { method, url, remoteAddress: socket.remoteAddress, params, query });

  res.on('finish', () => {
    logger.info('Request fullfilled', { method, url, remoteAddress: socket.remoteAddress });
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Server
const appConfigured = server.build();
appConfigured.listen(config.server.port, () => {
  logger.info(`Server ready - listening on '${config.server.hostname}:${config.server.port}'`);
});
