import { UseCase } from '@shared/use-case';
import { Product } from '../entities';

export type RetrieveProducts = UseCase<Record<string, never>, Promise<Product[]>>;
