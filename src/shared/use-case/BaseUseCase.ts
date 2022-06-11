import { Logger } from '../logger';

export class BaseUseCase {
  constructor(private logger: Logger) {}

  protected logInvoke(params?: Record<string, any>) {
    const message = `${this.constructor.name} invoked`;
    if (params) this.logger.info(message, params);
    else this.logger.info(message);
  }
}
