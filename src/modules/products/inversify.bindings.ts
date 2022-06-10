import { Container } from 'inversify';
import { MODULE_TYPES } from './constants';
import { ProductsRepository } from './domain';
import { ProductController, ProductMongooseRepository } from './infraestructure';

export const bindToContainer = (container: Container) => {
  // Repositories
  container.bind<ProductsRepository>(MODULE_TYPES.ProductsRepository).to(ProductMongooseRepository);

  // Controllers
  container.bind<ProductController>(MODULE_TYPES.ProductController).to(ProductController);
};
