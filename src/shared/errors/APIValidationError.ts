import joi from 'joi';

export interface APIValidationErrorParams {
  metadata: joi.ValidationErrorItem[];
}

export class APIValidationError extends Error {
  public static readonly TYPE = 'APIValidationError';

  public readonly type: string;
  public metadata: Record<string, any>;

  constructor({ metadata }: APIValidationErrorParams) {
    super();
    this.type = APIValidationError.TYPE;
    this.metadata = metadata;
  }

  static isAPIValidationError(error: any): error is APIValidationError {
    const keys = Object.keys(error);
    return keys.includes('type') && error['type'] === APIValidationError.TYPE;
  }
}
