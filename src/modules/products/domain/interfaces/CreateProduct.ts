import { UseCase } from '@shared/use-case';
import { Product, ProductCreateParams } from '../entities';

export type CreateProduct = UseCase<ProductCreateParams, Promise<Product>>;
