import { MODULE_TYPES as PRODUCT_TYPES } from '@modules/products';
import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';

export const MODULE_TYPES = {
  PRODUCT: { ...PRODUCT_TYPES },
  SHARED: { ...SHARED_TYPES },
} as const;
