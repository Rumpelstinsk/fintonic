import { Container } from 'inversify';
import { Logger, WinstonLogger } from './logger';

export const MODULE_TYPES = {
  Logger: 'Logger',
} as const;

export const bindToContainer = (container: Container) => {
  // Controllers
  container.bind<Logger>(MODULE_TYPES.Logger).to(WinstonLogger);
};
