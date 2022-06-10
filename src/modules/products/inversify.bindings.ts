import { Container } from 'inversify';
import { ProductController } from './infraestructure';

export const MODULE_TYPES = {
  ProductController: 'ProductController',
} as const;

export const bindToContainer = (container: Container) => {
  // Controllers
  container.bind<ProductController>(MODULE_TYPES.ProductController).to(ProductController);
};
