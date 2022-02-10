export interface ICustomer {
  id: number | null;
  first_name: string;
  last_name: string;
  type?: string | null;
  phone?: string | null;
  email: string;
  bank_account?: string | null;
  company?: string | null;
  comment?: string | null;
  full_name?: string | null;
  created_at?: Date | null;
  modified_at?: Date | null;
  deleted_at?: Date | null;
}

export interface ICustomerList {
  id: number | null;
  type?: string | null;
  phone?: string | null;
  email: string;
  company?: string | null;
  full_name?: string | null;
  created_at?: Date | null;
  modified_at?: Date | null;
  deleted_at?: Date | null;
}

export interface IShipAddress {
  id: number | null;
  first_name: string;
  last_name: string;
  country?: string | null;
  city?: string | null;
  zipcode?: string | null;
  address?: string | null;
  company?: string | null;
  comment?: string | null;
  default: boolean;
  full_name?: string | null;
  created_at?: Date | null;
  modified_at?: Date | null;
  deleted_at?: Date | null;
}

export interface IInvoiceAddress {
  id: number | null;
  first_name: string;
  last_name: string;
  country?: string | null;
  city?: string | null;
  zipcode?: string | null;
  address?: string | null;
  company?: string | null;
  tax_number?: string | null;
  comment?: string | null;
  default: boolean;
  full_name?: string | null;
  created_at?: Date | null;
  modified_at?: Date | null;
  deleted_at?: Date | null;
}

export const InitialCustomer: ICustomer = {
  id: null,
  first_name: '',
  last_name: '',
  email: ''
};
