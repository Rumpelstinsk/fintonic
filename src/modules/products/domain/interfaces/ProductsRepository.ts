import { BaseRepository } from '@shared/repository';
import { Product, ProductCreateParams } from '../entities';

export interface ProductsRepository extends BaseRepository<Product, ProductCreateParams> {
  findAll: () => Promise<Product[]>;
}
