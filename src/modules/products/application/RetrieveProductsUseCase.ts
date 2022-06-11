import { inject, injectable } from 'inversify';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';
import { Logger } from '@shared/logger';
import { BaseUseCase } from '@shared/use-case';
import { MODULE_TYPES } from '../constants';
import { Product, ProductsRepository, RetrieveProducts } from '../domain';

@injectable()
export class RetrieveProductsUseCase extends BaseUseCase implements RetrieveProducts {
  constructor(
    @inject(SHARED_TYPES.Logger) logger: Logger,
    @inject(MODULE_TYPES.ProductsRepository) private productsRepository: ProductsRepository,
  ) {
    super(logger);
  }

  async invoke(_: Record<string, never>): Promise<Product[]> {
    this.logInvoke();
    return this.productsRepository.findAll();
  }
}
