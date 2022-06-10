import { MODULE_TYPES as PRODUCT_TYPES } from '@modules/products/inversify.bindings';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/inversify.bindings';

export const MODULE_TYPES = {
  PRODUCT: { ...PRODUCT_TYPES },
  SHARED: { ...SHARED_TYPES },
} as const;
