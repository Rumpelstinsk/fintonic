import { BusinessError } from '@shared/errors';
import { LoggerDouble } from '@shared/logger/test';
import { ERROR_CODES } from '../domain';
import { ProductFactory, ProductsRepositoryDouble } from '../test';
import { DeleteProductUseCase } from './DeleteProductUseCase';

describe('DeleteProductUseCase', () => {
  const deletedProduct = ProductFactory.create({ archived: true });
  const logger = new LoggerDouble();
  const productsRepository = new ProductsRepositoryDouble();

  const useCase = new DeleteProductUseCase(logger, productsRepository);

  beforeEach(() => {
    logger.info = jest.fn();
    productsRepository.delete = jest.fn().mockResolvedValueOnce(deletedProduct);
  });

  it('logs request', async () => {
    const params = { id: deletedProduct._id };

    await useCase.invoke(params);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('DeleteProductUseCase invoked', params);
  });

  it('deletes a product', async () => {
    const params = { id: deletedProduct._id };

    await useCase.invoke(params);

    expect(productsRepository.delete).toHaveBeenCalledTimes(1);
    expect(productsRepository.delete).toBeCalledWith(params.id);
  });

  describe('validations', () => {
    it('throws an error if the product does not exists', async () => {
      const params = { id: deletedProduct._id };
      const expectedError = new BusinessError({
        message: 'Product not found',
        code: ERROR_CODES.PRODUCT_NOT_FOUND,
        namespace: 'DeleteProductUseCase',
        metadata: { ...params },
      });
      productsRepository.delete = jest.fn().mockResolvedValueOnce(null);

      const act = () => useCase.invoke(params);

      await expect(act).rejects.toThrow(expectedError);
    });
  });
});
