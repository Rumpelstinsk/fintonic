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
}
