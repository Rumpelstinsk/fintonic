import { MongooseBaseRepositoryDouble } from '@shared/repository/test';
import { ProductsRepository } from '../domain';

export class ProductsRepositoryDouble extends MongooseBaseRepositoryDouble implements ProductsRepository {
  findAll: jest.MockedFunction<any>;

  constructor() {
    super();
    this.findAll = jest.fn();
  }
}
