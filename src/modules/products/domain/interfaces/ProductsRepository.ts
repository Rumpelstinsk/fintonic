import { BaseRepository } from '@shared/repository';
import { Product, ProductCreateParams } from '../entities';

export type ProductsRepository = BaseRepository<Product, ProductCreateParams>;
