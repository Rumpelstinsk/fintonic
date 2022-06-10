import { Product } from '../../../domain';
import 'reflect-metadata';
import { IntegrationEnviroment } from '../../../../../test/enviroments/integration-enviroment';
import { ProductFactory } from '../../../test';
import { ProductMongooseRepository } from './ProductMongooseRepository';
import { IdGenerator } from '@test/helpers';

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

  describe('delete', () => {
    it('returns null if it cannot match any records', async () => {
      const result = await repository.delete(IdGenerator.generate());

      expect(result).toBeNull();
    });

    it('makes a soft delete', async () => {
      const params = ProductFactory.params();
      const product = await repository.create(params);

      const result = await repository.delete(product._id);

      expect(result?._id).toEqual(params._id);
      expect(result?.archived).toBeTruthy();
      expect(product.archived).toBeFalsy();
    });
  });
});
