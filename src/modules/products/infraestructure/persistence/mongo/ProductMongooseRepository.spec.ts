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
    await enviroment.tearDown();
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

  describe('findAll', () => {
    it('returns all elements sorted by creation date descending', async () => {
      const oldestProduct = await repository.create(ProductFactory.params());
      const newestProduct = await repository.create(ProductFactory.params());

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]._id).toEqual(newestProduct._id);
      expect(result[1]._id).toEqual(oldestProduct._id);
    });

    it('ignores deleted products', async () => {
      await repository.create(ProductFactory.params({ archived: true }));
      const activeProduct = await repository.create(ProductFactory.params({ archived: false }));

      const result = await repository.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]._id).toEqual(activeProduct._id);
    });

    it('returns an empty array if there is no elements', async () => {
      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });
});
