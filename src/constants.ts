import { MODULE_TYPES as PRODUCT_TYPES } from '@modules/products/inversify.bindings';

export const MODULE_TYPES = {
  ...PRODUCT_TYPES,
} as const;
