import { NextFunction, Request, Response } from 'express';
import { interfaces } from 'inversify-express-utils';
export declare class ProductController implements interfaces.Controller {
    list(_req: Request, _res: Response, _next: NextFunction): string;
}
