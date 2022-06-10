import { Logger } from '../Logger';

export class LoggerDouble implements Logger {
  debug: jest.MockedFunction<any>;
  info: jest.MockedFunction<any>;
  error: jest.MockedFunction<any>;

  constructor() {
    this.debug = jest.fn();
    this.info = jest.fn();
    this.error = jest.fn();
  }
}
