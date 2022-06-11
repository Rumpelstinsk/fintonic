import { Logger } from '@shared/logger';
import { BaseService } from '@shared/service';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';
import { inject, injectable } from 'inversify';
import { Authentication, ValidateResponse } from '../interfaces';

@injectable()
export class AuthenticationService extends BaseService implements Authentication {
  constructor(@inject(SHARED_TYPES.Logger) logger: Logger) {
    super(logger);
  }

  async validate(barearToken?: string): Promise<ValidateResponse> {
    this.logInvoke('validate', { barearToken });

    if (!this.decodeToken(barearToken)) return { status: 'unauthorized' };

    // 👇 TO DO
    // Here I would include some logic with this approach
    // 1. Validate token life
    //  1.1 If it's deprecated --> return { status: 'refresh' }
    // 2. Retrieve user by consuming a service on the proper module
    //  2.1 If there is no user --> return { status: 'unauthorized' }

    return {
      status: 'success',
      user: {},
    };
  }

  private decodeToken(barearToken?: string) {
    if (!barearToken) return null;
    // 👇 TO DO
    // Here I would include some extra validations to ensure the token is wellformed,
    // it has a proper signature, etc...

    return {};
  }
}
