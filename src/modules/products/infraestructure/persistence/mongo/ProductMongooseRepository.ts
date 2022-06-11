import { MongooseBaseRepository } from '@shared/repository';
import { injectable } from 'inversify';
import { Product, ProductCreateParams, ProductsRepository } from '../../../domain';
import { ProductModel } from './ProductModel';

@injectable()
export class ProductMongooseRepository
  extends MongooseBaseRepository<Product, ProductCreateParams>
  implements ProductsRepository
{
  constructor() {
    super(Product, ProductModel);
  }

  async findAll(): Promise<Product[]> {
    const data = await this.model
      .find({
        archived: false,
      })
      .sort({ _id: -1 })
      .lean();
    if (!data) return [];

    return data.map((product: any) => this.toObjectDomain(product));
  }
}
