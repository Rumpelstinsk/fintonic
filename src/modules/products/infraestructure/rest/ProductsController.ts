import { NextFunction, Request, Response } from 'express';
import { interfaces, controller, httpGet, request, response, next } from 'inversify-express-utils';

@controller('/products')
export class ProductController implements interfaces.Controller {
  @httpGet('/')
  list(@request() _req: Request, @response() _res: Response, @next() _next: NextFunction) {
    return 'pistachiiiin';
  }
}
