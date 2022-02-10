import { createStoreon, StoreonModule } from 'storeon';
import { customerService } from '../../services/api';
import { CustomerEventKeys, CustomerEvents } from './customer.events';
import { CustomerState } from './customer.state';
import { ICustomer, ICustomerList } from '../../models/Customer';
import { getMaxId } from '../../libraries/utils';

const getCustomerById = async (id: number) => {
  try {
    const data = await customerService.getCustomer(id);
    return data ? data : undefined;
  } catch (e) {
    console.log('Product not found');
  }
};

export const CustomerModule: StoreonModule<CustomerState, CustomerEvents> = (store) => {
  store.on('@init', () => ({ customers: [] }));

  store.on(CustomerEventKeys.InitCustomersEvent, async (state) => {
    try {
      let data = undefined;
      if (state.customers.length > 0) {
        const maxValueOfY = getMaxId<ICustomerList>(state.customers);
        const lastId = await customerService.getLastId();
        if (maxValueOfY !== lastId) {
          data = await customerService.getAllCustomer();
        }
      } else {
        data = await customerService.getAllCustomer();
      }

      if (data !== undefined) {
        store.dispatch(CustomerEventKeys.LoadCustomersEvent, data);
      }
    } catch (e) {
      console.error('Product Module Store InitCustomerEvent');
    }
  });
  store.on(CustomerEventKeys.ClearStateEvent, (state) => ({
    currentCustomer: undefined
  }));
  store.on(CustomerEventKeys.GetCustomerEvent, async (state, customer_id: number) => {
    const product = await getCustomerById(customer_id);
    if (product !== undefined) {
      store.dispatch(CustomerEventKeys.LoadCurrentCustomerEvent, product);
    }
  });
  store.on(CustomerEventKeys.LoadCurrentCustomerEvent, (state, Customer: ICustomer) => ({
    currentCustomer: Customer
  }));
  store.on(CustomerEventKeys.LoadCustomersEvent, (state, Customers: ICustomerList[]) => ({
    customers: Customers
  }));
  store.on(CustomerEventKeys.SaveCustomerEvent, (state, customer: ICustomer) => ({
    customers: [...state.customers, customer]
  }));
  store.on(CustomerEventKeys.UpdateCustomerEvent, (state, customer: ICustomer) => {
    const foundIndex = state.customers.findIndex((x: ICustomerList) => x.id == customer.id);
    state.customers[foundIndex] = customer;
    return {
      customers: [...state.customers]
    };
  });
};

export const CustomerStore = createStoreon<CustomerState, CustomerEvents>([CustomerModule]);
