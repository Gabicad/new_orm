import { IManufacturer, IProduct, IProductList } from '../../models/Product';

export interface ProductState {
  products: IProductList[];
  currentProduct: IProduct | undefined;
  manufacturers: IManufacturer[];
}
