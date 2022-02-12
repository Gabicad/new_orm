import { IProduct, IProductList } from '../../models/Product';
export const InitProductsEvent = Symbol(`InitProductsEvent`);
export const SaveProductEvent = Symbol(`SaveProductEvent`);
export const LoadProductsEvent = Symbol(`LoadProductsEvent`);
export const UpdateProductEvent = Symbol(`UpdateProductEvent`);
export const GetProductsEvent = Symbol(`GetProductsEvent`);
export const LoadCurrentProductEvent = Symbol(`LoadCurrentProductEvent`);
export const ClearStateEvent = Symbol(`ClearStateEvent`);
export const DeleteProductImageEvent = Symbol(`DeleteProductImageEvent`);

export const ProductEventKeys = {
  GetProductsEvent,
  ClearStateEvent,
  InitProductsEvent,
  SaveProductEvent,
  UpdateProductEvent,
  LoadProductsEvent,
  LoadCurrentProductEvent,
  DeleteProductImageEvent
} as const;

export interface ProductEvents {
  [InitProductsEvent]: void;
  [SaveProductEvent]: IProduct;
  [GetProductsEvent]: number;
  [ClearStateEvent]: void;
  [LoadCurrentProductEvent]: IProduct;
  [LoadProductsEvent]: IProductList[];
  [UpdateProductEvent]: IProduct;
  [DeleteProductImageEvent]: number;
}
