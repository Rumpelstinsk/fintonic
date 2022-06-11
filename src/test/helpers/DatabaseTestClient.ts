import { ProductModel } from '@modules/products/infraestructure';
import { ProductFactory } from '@modules/products/test';
import mongoose from 'mongoose';

const productsContext = ProductModel;

export class DatabaseTestClient {
  connection: any;

  constructor() {
    this.connection = mongoose.connection;
  }

  model(name: string) {
    return mongoose.model(name);
  }

  async drop() {
    await this.connection.dropDatabase();
  }

  async seedProducts() {
    const completeProduct = ProductFactory.create({ name: 'complete product', description: 'description product' });
    const deletedProduct = ProductFactory.create({ name: 'deleted product', archived: true });
    const incompleteProduct = ProductFactory.create({ name: 'incomplete product' });

    await productsContext.insertMany([completeProduct, deletedProduct, incompleteProduct]);

    return {
      completeProduct,
      deletedProduct,
      incompleteProduct,
    };
  }
}
