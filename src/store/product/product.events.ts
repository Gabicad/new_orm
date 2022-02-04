import { IProduct, IProductList } from '../../models/Product';
export const InitProductsEvent = Symbol(`InitProductsEvent`);
export const SaveProductEvent = Symbol(`SaveProductEvent`);
export const LoadProductsEvent = Symbol(`LoadProductsEvent`);
export const UpdateProductEvent = Symbol(`UpdateProductEvent`);

export const ProductEventKeys = {
  InitProductsEvent,
  SaveProductEvent,
  UpdateProductEvent,
  LoadProductsEvent
} as const;

export interface ProductEvents {
  [InitProductsEvent]: void;
  [SaveProductEvent]: IProduct;
  [LoadProductsEvent]: IProductList[];
  [UpdateProductEvent]: IProduct;
}
