import { Product } from '../../../domain';
import 'reflect-metadata';
import { IntegrationEnviroment } from '../../../../../test/enviroments/integration-enviroment';
import { ProductFactory } from '../../../test';
import { ProductMongooseRepository } from './ProductMongooseRepository';

const enviroment = new IntegrationEnviroment();

describe('ProductMongooseRepository', () => {
  const repository = new ProductMongooseRepository();

  beforeEach(async () => {
    await enviroment.setup();
  });

  afterAll(async () => {
    await enviroment.clear();
  });

  describe('create', () => {
    it('creates a new product', async () => {
      const params = ProductFactory.params();

      const result = await repository.create(params);

      expect(result._id).toEqual(params._id);
      expect(result).toBeInstanceOf(Product);
    });
  });
});
