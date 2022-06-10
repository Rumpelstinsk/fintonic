import { Logger } from './Logger';

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

  error(message: string, metadata?: Record<string, unknown>): void {
    console.error({
      message,
      ...(metadata && { metadata }),
    });
  }
}
