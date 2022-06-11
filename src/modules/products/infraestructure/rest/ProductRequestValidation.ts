import { BaseValidator, objectIdValidator } from '@shared/api-validator';
import joi from 'joi';

export class ProductRequestValidation extends BaseValidator {
  static post(body: any) {
    const data = { body };
    const schema = joi.object().keys({
      body: joi.object().keys({
        name: joi.string().trim().required(),
        description: joi.string().trim().optional(),
      }),
    });

    this.applyValidation(data, schema);
  }

  static delete(params: any) {
    const data = { params };
    const schema = joi.object().keys({
      params: joi.object().keys({
        id: joi.string().trim().required().custom(objectIdValidator),
      }),
    });

    this.applyValidation(data, schema);
  }
}
