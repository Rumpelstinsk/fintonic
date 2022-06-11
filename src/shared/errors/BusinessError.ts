export interface BusinessErrorParams {
  message: string;
  code: string;
  namespace: string;
  metadata?: Record<string, any>;
}

export class BusinessError extends Error {
  public static readonly TYPE = 'BusinessError';

  public readonly type: string;
  public message: string;
  public code: string;
  public namespace: string;
  public metadata?: Record<string, any>;

  constructor({ message, code, namespace, metadata }: BusinessErrorParams) {
    super();
    this.message = message;
    this.code = code;
    this.namespace = namespace;
    this.type = BusinessError.TYPE;
    this.metadata = metadata;
  }

  static isBusinessError(error: any): error is BusinessError {
    const keys = Object.keys(error);
    return keys.includes('type') && error['type'] === BusinessError.TYPE;
  }
}
