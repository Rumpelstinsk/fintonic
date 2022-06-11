import { Product } from '../../domain';
import { ProductResponse } from './dto';

export class ProductsNormalization {
  static normalize({ _id, name, description }: Product): ProductResponse {
    return {
      id: _id,
      name,
      ...(description && { description }),
    };
  }
}
