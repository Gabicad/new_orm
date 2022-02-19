import { ICustomer, IInvoiceAddress, IShipAddress } from './Customer';
import { ChipPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export interface IOfferStatus {
  id?: number;
  name: string;
  color: OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ChipPropsColorOverrides
  >;
  auto?: boolean;
  priority?: number;
  alert_time?: number;
}
export interface IOffer {
  id?: number;
  user_id?: number;
  order_id?: number;
  offer_status_id?: number;
  customer_id?: number;
  ship_address_id?: number;
  invoice_address_id?: number;
  version: number;
  pdf_version: number;
  template: number;
  header?: string;
  footer?: string;
  discount_with_ship: boolean;
  discount?: number;
  ship_cost?: number;
  ship_show: boolean;
  offer_date: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  customer?: ICustomer;
  invoice_address?: IInvoiceAddress;
  ship_address?: IShipAddress;
  offer_status?: IOfferStatus;
  offer_details?: IOfferDetail[];
}
export interface IOfferDetail {
  id?: number;
  extra_offer_info?: string;
  extra_info?: string;
  in_stock?: boolean;
  offer?: IOffer;
  offer_text?: string;
  price?: number;
  product_id: number;
  product_image_id: number;
  product_name: string;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
