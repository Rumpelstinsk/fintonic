import { Container } from 'inversify';
import { bindToContainer as bindProducts } from '@modules/products/inversify.bindings';
import { bindToContainer as bindShared } from '@shared/inversify.bindings';

export const container = new Container();

export const initDI = () => {
  bindShared(container);
  bindProducts(container);
};
