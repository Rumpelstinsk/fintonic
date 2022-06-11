import { UseCase } from '@shared/use-case';

export interface DeleteProductParams {
  id: string;
}

export type DeleteProduct = UseCase<DeleteProductParams, Promise<void>>;
