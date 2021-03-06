import { IdGenerator } from '@test/helpers';
import { Product, ProductCreateParams, ProductParams } from '../domain';

export class ProductFactory {
  static createParams(params: Partial<ProductCreateParams> = {}): ProductCreateParams {
    return {
      name: 'a-product-name',
      ...params,
    };
  }

  static params(params: Partial<ProductParams> = {}): ProductParams {
    const { archived = false, archivedAt = new Date(), ...rest } = params;
    return {
      _id: IdGenerator.generate(),
      name: 'a-product-name',
      archived,
      ...(archived && { archivedAt }),
      ...rest,
    };
  }

  static create(params: Partial<ProductParams> = {}): Product {
    return new Product(this.params(params));
  }
}
