import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@shared/use-case';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';
import { DeleteProduct, DeleteProductParams, ERROR_CODES, ProductsRepository } from '../domain';
import { MODULE_TYPES } from '../constants';
import { Logger } from '@shared/logger';
import { BusinessError } from '@shared/errors';

@injectable()
export class DeleteProductUseCase extends BaseUseCase implements DeleteProduct {
  constructor(
    @inject(SHARED_TYPES.Logger) logger: Logger,
    @inject(MODULE_TYPES.ProductsRepository) private productsRepository: ProductsRepository,
  ) {
    super(logger);
  }

  async invoke(params: DeleteProductParams): Promise<void> {
    this.logInvoke(params);
    const result = await this.productsRepository.delete(params.id);
    if (!result)
      throw new BusinessError({
        message: 'Product not found',
        code: ERROR_CODES.PRODUCT_NOT_FOUND,
        namespace: 'DeleteProductUseCase',
        metadata: { ...params },
      });
  }
}
