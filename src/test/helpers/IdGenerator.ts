import { ObjectId } from 'mongodb';

export class IdGenerator {
  static generate(): string {
    return new ObjectId().toString();
  }
}
