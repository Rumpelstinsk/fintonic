import 'reflect-metadata';
import { config } from '@config/config';
import { Logger } from '@shared/logger';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { MODULE_TYPES } from '../constants';
import { APIValidationError, AuthorizationError, BusinessError } from '@shared/errors';

export const initAPI = (container: Container) => {
  const router = express();
  const logger = container.get<Logger>(MODULE_TYPES.SHARED.Logger);
  const currentConfig = config();

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
  const server = new InversifyExpressServer(container, null, { rootPath: '/' }, router);
  server.setErrorConfig((router: any) => {
    router.use((error: any, _req: Request, res: Response, next: NextFunction) => {
      if (error) {
        logger.error(error);

        if (BusinessError.isBusinessError(error)) {
          return res.status(400).json({
            code: error.code,
            message: error.message,
          });
        }

        if (APIValidationError.isAPIValidationError(error)) {
          return res.status(400).json(error.metadata);
        }

        if (AuthorizationError.isAuthorizationError(error)) {
          return res.status(401).json(error);
        }

        return res.status(500).json(error);
      }

      return next();
    });
  });
  const appConfigured = server.build();
  return appConfigured.listen(currentConfig.server.port, () => {
    logger.info(`Server ready - listening on '${currentConfig.server.hostname}:${currentConfig.server.port}'`);
  });
};
