import joi from 'joi';
import { APIValidationError } from '@shared/errors';

export class BaseValidator {
  protected static applyValidation(data: any, schema: joi.ObjectSchema<any>) {
    const validation = schema.validate(data);

    if (validation.error) {
      throw new APIValidationError({ metadata: validation.error.details });
    }
  }
}
