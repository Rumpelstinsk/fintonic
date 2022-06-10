import mongoose from 'mongoose';
import { BaseRepository } from './BaseRepository';

export class MongooseBaseRepository<DomainEntity, CreatorParams>
  implements BaseRepository<DomainEntity, CreatorParams>
{
  domainObjectKlass;
  model: mongoose.Model<any>;

  constructor(domainObjectKlass: any, model: mongoose.Model<any>) {
    this.domainObjectKlass = domainObjectKlass;
    this.model = model;
  }

  async create(params: CreatorParams): Promise<DomainEntity> {
    const result = await this.model.create(params);
    return this.toObjectDomain(result.toObject());
  }

  async delete(id: string): Promise<DomainEntity | null> {
    const result = await this.model
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          archived: true,
          archivedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean();

    if (!result) {
      return null;
    }
    return this.toObjectDomain(result);
  }

  protected toObjectDomain(document: Document) {
    return new this.domainObjectKlass(this.parseObjectIds(document));
  }

  private parseObjectIds(document: any) {
    const mainKeys = Object.keys(document);
    for (const key of mainKeys) {
      const value = document[key];
      if (!value) {
        continue;
      }
      if (typeof value === 'object') {
        if (mongoose.isValidObjectId(value)) {
          document[key] = value.toString();
          continue;
        }
        if (Array.isArray(value)) {
          document[key] = this.processArrayItems(value);
          continue;
        }
        document[key] = this.parseObjectIds(value);
      }
    }
    return document;
  }

  private processArrayItems(plainArray: any[]) {
    return plainArray.map(item => {
      if (!item) {
        return null;
      }
      if (typeof item === 'object') {
        const innerKeys = Object.keys(item);

        if (innerKeys.includes('id') && innerKeys.includes('_bsontype')) {
          return item.toString();
        }

        return this.parseObjectIds(item);
      }
      return item;
    });
  }
}
