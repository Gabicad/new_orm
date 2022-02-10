import { ICustomer, ICustomerList } from '../../models/Customer';
export const InitCustomersEvent = Symbol(`InitCustomersEvent`);
export const SaveCustomerEvent = Symbol(`SaveCustomerEvent`);
export const LoadCustomersEvent = Symbol(`LoadCustomersEvent`);
export const UpdateCustomerEvent = Symbol(`UpdateCustomerEvent`);
export const GetCustomerEvent = Symbol(`GetCustomerEvent`);
export const LoadCurrentCustomerEvent = Symbol(`LoadCurrentCustomerEvent`);
export const ClearStateEvent = Symbol(`ClearStateEvent`);

export const CustomerEventKeys = {
  GetCustomerEvent,
  ClearStateEvent,
  InitCustomersEvent,
  SaveCustomerEvent,
  UpdateCustomerEvent,
  LoadCustomersEvent,
  LoadCurrentCustomerEvent
} as const;

export interface CustomerEvents {
  [InitCustomersEvent]: void;
  [SaveCustomerEvent]: ICustomer;
  [GetCustomerEvent]: number;
  [ClearStateEvent]: void;
  [LoadCurrentCustomerEvent]: ICustomer;
  [LoadCustomersEvent]: ICustomerList[];
  [UpdateCustomerEvent]: ICustomer;
}
