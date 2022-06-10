import 'reflect-metadata';
import { config } from '@config/config';
import { Logger } from '@shared/logger';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { MODULE_TYPES } from '../constants';

export const initAPI = (container: Container) => {
  const router = express();
  const logger = container.get<Logger>(MODULE_TYPES.SHARED.Logger);
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
  return appConfigured.listen(config.server.port, () => {
    logger.info(`Server ready - listening on '${config.server.hostname}:${config.server.port}'`);
  });
};
