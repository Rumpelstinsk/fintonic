import { injectable } from 'inversify';
import { Product, ProductCreateParams, ProductsRepository } from '../../../domain';
import { ProductModel } from './ProductModel';

@injectable()
export class ProductMongooseRepository implements ProductsRepository {
  constructor(private model = ProductModel) {}

  async create(params: ProductCreateParams): Promise<Product> {
    const result = await this.model.create(params);
    return this.toObjectDomain(result.toObject());
  }

  protected toObjectDomain(document: Document) {
    return new Product(this.parseObjectIds(document));
  }

  protected parseObjectIds(document: any) {
    const mainKeys = Object.keys(document);
    for (const key of mainKeys) {
      const value = document[key];
      if (!value) {
        continue;
      }
      if (typeof value === 'object') {
        const innerKeys = Object.keys(value);
        if (innerKeys.includes('id') && innerKeys.includes('_bsontype')) {
          document[key] = value.toString();
          continue;
        }
        if (Array.isArray(value)) {
          document[key] = this.processArrayItems(value);
          continue;
        }
        document[key] = this.parseObjectIds(value);
      }
    }
    return document;
  }

  private processArrayItems(plainArray: any[]) {
    return plainArray.map(item => {
      if (!item) {
        return null;
      }
      if (typeof item === 'object') {
        const innerKeys = Object.keys(item);

        if (innerKeys.includes('id') && innerKeys.includes('_bsontype')) {
          return item.toString();
        }

        return this.parseObjectIds(item);
      }
      return item;
    });
  }
}
