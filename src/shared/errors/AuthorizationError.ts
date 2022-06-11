export interface AuthorizationErrorParams {
  message: string;
  namespace: string;
  metadata?: Record<string, any>;
}

export class AuthorizationError extends Error {
  public static readonly TYPE = 'AuthorizationError';

  public readonly type: string;
  public message: string;
  public namespace: string;
  public metadata?: Record<string, any>;

  constructor({ message, namespace, metadata }: AuthorizationErrorParams) {
    super();
    this.message = message;
    this.namespace = namespace;
    this.type = AuthorizationError.TYPE;
    this.metadata = metadata;
  }

  static isAuthorizationError(error: any): error is AuthorizationError {
    const keys = Object.keys(error);
    return keys.includes('type') && error['type'] === AuthorizationError.TYPE;
  }
}
