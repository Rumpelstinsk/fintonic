import { Container } from 'inversify';
import { bindToContainer as bindProducts } from '@modules/products/inversify.bindings';

export const container = new Container();

export const initDI = () => {
  bindProducts(container);
};
