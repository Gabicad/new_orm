import { IUser } from './User';

export interface IProductList {
  id: number | undefined;
  name: string;
  active: boolean;
  manufacturer?: IManufacturer;
  product_features?: IProductFeature[];
  product_images?: IProductImages[];
  price: number;
  created_at?: Date;
  modified_at?: Date;
}

export interface IProduct extends IProductList {
  description?: string;
  description_short?: string;
}

export interface IProductFeature {
  id: number;
  product_id: number;
  name: string;
  value: string;
}
export interface IProductImages {
  id: number;
  product_id: number;
  default: boolean;
}

export interface IManufacturer {
  id: number;
  name: string;
  short: string;
  alias: string;
}

export const InitialProduct: IProduct = {
  id: undefined,
  description: undefined,
  description_short: undefined,
  name: '',
  active: true,
  manufacturer: undefined,
  product_features: undefined,
  product_images: undefined,
  price: 0
};
