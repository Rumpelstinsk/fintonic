import { injectable } from 'inversify';
import { Logger } from './Logger';

@injectable()
export class WinstonLogger implements Logger {
  debug(message: string, metadata?: Record<string, unknown>): void {
    console.debug({
      message,
      ...(metadata && { metadata }),
    });
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    console.info({
      message,
      ...(metadata && { metadata }),
    });
  }

  error(error: unknown, metadata?: Record<string, unknown>): void {
    console.error({
      error,
      ...(metadata && { metadata }),
    });
  }
}
