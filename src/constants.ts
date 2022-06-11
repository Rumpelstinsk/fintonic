import { MODULE_TYPES as SHARED_TYPES } from '@shared/constants';
import { MODULE_TYPES as PRODUCT_TYPES } from '@modules/products';
import { MODULE_TYPES as AUTH_TYPES } from '@modules/auth';

export const MODULE_TYPES = {
  PRODUCT: { ...PRODUCT_TYPES },
  SHARED: { ...SHARED_TYPES },
  AUTH: { ...AUTH_TYPES },
} as const;
