import { IOfferDetail } from './Offers';

export interface IProductList {
  id: number | undefined;
  name: string;
  active: boolean;
  manufacturer?: IManufacturer;
  product_features?: IProductFeature[];
  product_images?: IProductImages[];
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IProduct extends IProductList {
  description?: string;
  description_short?: string;
  manufacturer_id?: number;
  offer_details?: IOfferDetail[];
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

export const InitialProduct: INewProduct = {
  name: '',
  reference: '',
  manufacturer_id: '',
  productFeatures: [],
  files: []
};
export interface INewProduct {
  name: string;
  reference: string;
  manufacturer_id: string;
  manufacturer?: IManufacturer;
  productFeatures: any[];
  files: any[];
}
