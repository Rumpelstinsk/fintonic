import { Container } from 'inversify';
import { MODULE_TYPES } from './constants';
import { Logger, WinstonLogger } from './logger';

export const bindToContainer = (container: Container) => {
  // Controllers
  container.bind<Logger>(MODULE_TYPES.Logger).to(WinstonLogger);
};
