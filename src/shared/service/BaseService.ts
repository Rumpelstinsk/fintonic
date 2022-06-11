import { injectable, unmanaged } from 'inversify';
import { Logger } from '../logger';

@injectable()
export class BaseService {
  constructor(@unmanaged() private logger: Logger) {}

  protected logInvoke(method: string, params?: Record<string, any>) {
    const message = `${this.constructor.name} - ${method} invoked`;
    if (params) this.logger.info(message, params);
    else this.logger.info(message);
  }
}
