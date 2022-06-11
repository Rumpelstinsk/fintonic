import { injectable, unmanaged } from 'inversify';
import 'reflect-metadata';
import { Logger } from '../logger';

@injectable()
export class BaseUseCase {
  constructor(@unmanaged() private logger: Logger) {}

  protected logInvoke(params?: Record<string, any>) {
    const message = `${this.constructor.name} invoked`;
    if (params) this.logger.info(message, params);
    else this.logger.info(message);
  }
}
