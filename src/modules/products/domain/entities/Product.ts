export interface ProductCreateParams {
  name: string;
  description?: string;
}

export interface ProductParams extends ProductCreateParams {
  _id: string;
  archived: boolean;
  archivedAt?: Date;
}

export class Product {
  public _id: string;
  public name: string;
  public archived: boolean;
  public description?: string;
  public archivedAt?: Date;

  constructor({ _id, name, description, archived, archivedAt }: ProductParams) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.archived = archived;
    this.archivedAt = archivedAt;
  }
}
