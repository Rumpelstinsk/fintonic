import { BaseRepository } from '../BaseRepository';

export class MongooseBaseRepositoryDouble<DomainEntity = unknown, CreateParams = unknown>
  implements BaseRepository<DomainEntity, CreateParams>
{
  create: jest.MockedFunction<any>;
  delete: jest.MockedFunction<any>;

  constructor() {
    this.create = jest.fn();
    this.delete = jest.fn();
  }
}
