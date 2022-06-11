import { LoggerDouble } from '@shared/logger/test';
import { ProductFactory, ProductsRepositoryDouble } from '../test';
import { CreateProductUseCase } from './CreateProductUseCase';

describe('CreateProductUseCase', () => {
  const logger = new LoggerDouble();
  const productsRepository = new ProductsRepositoryDouble();

  const useCase = new CreateProductUseCase(logger, productsRepository);

  beforeEach(() => {
    logger.info = jest.fn();
    productsRepository.create = jest.fn();
  });

  it('logs request', async () => {
    const params = ProductFactory.params();

    await useCase.invoke(params);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('CreateProductUseCase invoked', params);
  });

  it('returns created product', async () => {
    const productParams = ProductFactory.params();
    const product = ProductFactory.create(productParams);
    productsRepository.create = jest.fn().mockResolvedValue(product);

    const result = await useCase.invoke(productParams);

    expect(result).toEqual(product);
    expect(productsRepository.create).toHaveBeenCalledTimes(1);
    expect(productsRepository.create).toBeCalledWith(productParams);
  });
});
