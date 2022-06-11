import { Container } from 'inversify';
import { CreateProductUseCase, DeleteProductUseCase, RetrieveProductsUseCase } from './application';
import { MODULE_TYPES } from './constants';
import { CreateProduct, DeleteProduct, ProductsRepository, RetrieveProducts } from './domain';
import { ProductController, ProductMongooseRepository } from './infraestructure';

export const bindToContainer = (container: Container) => {
  // Repositories
  container.bind<ProductsRepository>(MODULE_TYPES.ProductsRepository).to(ProductMongooseRepository);

  // Use cases
  container.bind<CreateProduct>(MODULE_TYPES.CreateProduct).to(CreateProductUseCase);
  container.bind<DeleteProduct>(MODULE_TYPES.DeleteProduct).to(DeleteProductUseCase);
  container.bind<RetrieveProducts>(MODULE_TYPES.RetrieveProducts).to(RetrieveProductsUseCase);

  // Controllers
  container.bind<ProductController>(MODULE_TYPES.ProductController).to(ProductController);
};
