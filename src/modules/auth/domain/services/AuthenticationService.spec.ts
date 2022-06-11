import { LoggerDouble } from '@shared/logger/test';
import { ValidateResponseKO, ValidateResponseOk } from '../interfaces';
import { AuthenticationService } from './AuthenticationService';

describe('AuthenticationService', () => {
  const logger = new LoggerDouble();

  const service = new AuthenticationService(logger);

  beforeEach(() => {
    logger.info = jest.fn();
  });

  describe('validate', () => {
    it('logs the request', async () => {
      const barearToken = 'a-token';

      await service.validate(barearToken);

      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('AuthenticationService - validate invoked', { barearToken });
    });

    it('returns unauthorized if there is no token', async () => {
      const barearToken = '';
      const expectedResult: ValidateResponseKO = {
        status: 'unauthorized',
      };

      const result = await service.validate(barearToken);

      expect(result).toEqual(expectedResult);
    });

    it('returns success if the token is still valid', async () => {
      const barearToken = 'validToken';
      const expectedResult: ValidateResponseOk = {
        status: 'success',
        user: {},
      };

      const result = await service.validate(barearToken);

      expect(result).toEqual(expectedResult);
    });
  });
});
