import { Container } from 'inversify';
import { MODULE_TYPES } from './constants';
import { Authentication, AuthenticationService } from './domain';

export const bindToContainer = (container: Container) => {
  // Services
  container.bind<Authentication>(MODULE_TYPES.Authentication).to(AuthenticationService);
};
