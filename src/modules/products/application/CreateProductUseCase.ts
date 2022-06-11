import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@shared/use-case';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';
import { CreateProduct, Product, ProductCreateParams, ProductsRepository } from '../domain';
import { MODULE_TYPES } from '../constants';
import { Logger } from '@shared/logger';

@injectable()
export class CreateProductUseCase extends BaseUseCase implements CreateProduct {
  constructor(
    @inject(SHARED_TYPES.Logger) logger: Logger,
    @inject(MODULE_TYPES.ProductsRepository) private productsRepository: ProductsRepository,
  ) {
    super(logger);
  }

  async invoke(params: ProductCreateParams): Promise<Product> {
    this.logInvoke(params);
    return this.productsRepository.create(params);
  }
}
