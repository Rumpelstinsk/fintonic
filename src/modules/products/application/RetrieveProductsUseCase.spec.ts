import { LoggerDouble } from '@shared/logger/test';
import { ProductFactory, ProductsRepositoryDouble } from '../test';
import { RetrieveProductsUseCase } from './RetrieveProductsUseCase';

describe('RetrieveProductsUseCase', () => {
  const logger = new LoggerDouble();
  const productsRepository = new ProductsRepositoryDouble();

  const useCase = new RetrieveProductsUseCase(logger, productsRepository);

  beforeEach(() => {
    logger.info = jest.fn();
    productsRepository.findAll = jest.fn();
  });

  it('logs request', async () => {
    await useCase.invoke({});

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('RetrieveProductsUseCase invoked');
  });

  it('returns all products', async () => {
    const product = ProductFactory.create();
    productsRepository.findAll = jest.fn().mockResolvedValue([product]);

    const result = await useCase.invoke({});

    expect(result).toEqual([product]);
  });
});
