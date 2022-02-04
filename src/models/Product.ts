export interface IProductList {
  id: number;
  name: string;
  active: boolean;
  manufacturer: IManufacturer;
  price: number;
  created_at: Date;
  modified_at: Date;
}

export interface IProduct extends IProductList {
  description: string;
  description_short: string;
}

export interface IManufacturer {
  id: number;
  name: string;
  short: string;
  alias: string;
}
