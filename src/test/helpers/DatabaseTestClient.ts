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

  async seedUser() {
    // 👇 TO DO - Here I would include some logic to insert a user with a valid token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    return { token };
  }
}
