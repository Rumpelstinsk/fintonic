import { Product, ProductCreateParams } from '../entities';

export interface ProductsRepository {
  create: (params: ProductCreateParams) => Promise<Product>;
}
