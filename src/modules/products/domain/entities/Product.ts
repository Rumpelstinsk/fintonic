export interface ProductCreateParams {
  name: string;
  description?: string;
}

export interface ProductParams extends ProductCreateParams {
  _id: string;
}

export class Product {
  public _id: string;
  public name: string;
  public description?: string;

  constructor({ _id, name, description }: ProductParams) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}
