import { LoggerDouble } from '@shared/logger/test';
import { IdGenerator } from '@test/helpers';
import { ProductsRepositoryDouble } from '../test';
import { DeleteProductUseCase } from './DeleteProductUseCase';

describe('DeleteProductUseCase', () => {
  const logger = new LoggerDouble();
  const productsRepository = new ProductsRepositoryDouble();

  const useCase = new DeleteProductUseCase(logger, productsRepository);

  beforeEach(() => {
    logger.info = jest.fn();
    productsRepository.delete = jest.fn();
  });

  it('logs request', async () => {
    const params = { id: IdGenerator.generate() };

    await useCase.invoke(params);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('DeleteProductUseCase invoked', params);
  });

  it('deletes a product', async () => {
    const params = { id: IdGenerator.generate() };

    await useCase.invoke(params);

    expect(productsRepository.delete).toHaveBeenCalledTimes(1);
    expect(productsRepository.delete).toBeCalledWith(params.id);
  });
});
