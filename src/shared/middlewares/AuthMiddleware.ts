import { Authentication, MODULE_TYPES as AUTH_TYPES } from '@modules/auth';
import { AuthorizationError } from '@shared/errors';
import { Request, Response, NextFunction } from 'express';
import { container } from '../../inversify.dependencies';

export const authMiddleware = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const authService = container.get<Authentication>(AUTH_TYPES.Authentication);
    const authRequiredAction = await authService.validate(req.headers.authorization);

    switch (authRequiredAction.status) {
      case 'success':
        req.user = authRequiredAction.user;
        return next();
      case 'retry':
        // 👇 TO DO
        // Here I would include some logic to redirect the user to the proper refresh token flow
        // Commonly returning a 301 and the url to refresh the token
        // But just to avoid TS complain here, I just go ahead, for the challenge purpose
        return next();
      default:
        return next(
          new AuthorizationError({
            message: 'Insufficient permissions',
            namespace: 'authMiddleware',
            metadata: { req },
          }),
        );
    }
  };
};
