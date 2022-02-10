import { ICustomer, ICustomerList } from '../../models/Customer';

export interface CustomerState {
  customers: ICustomerList[];
  currentCustomer: ICustomer | undefined;
}
