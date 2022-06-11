import { ProductFactory } from '@modules/products/test';
import { ProductsNormalization } from './ProductsNormalization';

describe('ProductsNormalization', () => {
  describe('normalize', () => {
    it('normalizes an product domain entity', () => {
      const product = ProductFactory.create({ archived: false, description: 'a-description' });

      const normalized = ProductsNormalization.normalize(product);

      expect(normalized).toEqual({
        id: product._id,
        name: product.name,
        description: product.description,
      });
    });

    it('does not include description if there is none', () => {
      const product = ProductFactory.create({ archived: false });
      delete product.description;

      const normalized = ProductsNormalization.normalize(product);

      expect(normalized).toEqual({
        id: product._id,
        name: product.name,
      });
    });

    it('does not include archived properties', () => {
      const product = ProductFactory.create({ archived: true, archivedAt: new Date() });
      delete product.description;

      const normalized = ProductsNormalization.normalize(product);

      expect(normalized).toEqual({
        id: product._id,
        name: product.name,
      });
    });
  });
});
