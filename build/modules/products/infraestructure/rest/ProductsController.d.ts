import { NextFunction, Request, Response } from 'express';
import { interfaces } from 'inversify-express-utils';
import { ProductsRepository } from '../../domain';
export declare class ProductController implements interfaces.Controller {
    private productsRepository;
    constructor(productsRepository: ProductsRepository);
    list(_req: Request, _res: Response, _next: NextFunction): Promise<import("../../domain").Product>;
}
