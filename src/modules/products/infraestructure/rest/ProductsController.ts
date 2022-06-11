import { Response } from 'express';
import { inject } from 'inversify';
import {
  interfaces,
  controller,
  httpGet,
  response,
  httpDelete,
  requestParam,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import { CreateProduct, DeleteProduct, ProductCreateParams, RetrieveProducts } from '../../domain';
import { MODULE_TYPES } from '../../constants';
import { ProductsNormalization } from './ProductsNormalization';

@controller('/products')
export class ProductController implements interfaces.Controller {
  constructor(
    @inject(MODULE_TYPES.RetrieveProducts) private retrieveProducts: RetrieveProducts,
    @inject(MODULE_TYPES.CreateProduct) private createProduct: CreateProduct,
    @inject(MODULE_TYPES.DeleteProduct) private deleteProduct: DeleteProduct,
  ) {}

  @httpGet('/')
  async list() {
    const products = await this.retrieveProducts.invoke({});
    return products.map(product => ProductsNormalization.normalize(product));
  }

  @httpDelete('/:productId')
  async delete(@requestParam('productId') id: string, @response() res: Response) {
    await this.deleteProduct.invoke({ id });
    res.sendStatus(204);
  }

  @httpPost('/')
  async create(@requestBody() payload: ProductCreateParams) {
    const product = await this.createProduct.invoke(payload);
    return ProductsNormalization.normalize(product);
  }
}
