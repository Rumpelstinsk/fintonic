import { IdGenerator } from '@test/helpers';
import { Product, ProductParams } from '../domain';

export class ProductFactory {
  static params(params: Partial<ProductParams> = {}): ProductParams {
    return {
      _id: IdGenerator.generate(),
      name: 'a-product-name',
      ...params,
    };
  }

  static create(params: Partial<ProductParams> = {}): Product {
    return new Product(this.params(params));
  }
}
