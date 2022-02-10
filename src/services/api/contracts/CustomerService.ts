import { IApiClient } from '../core/ApiClient';
import { ICustomerList, ICustomer } from '../../../models/Customer';

export interface ICustomerApiClient {
  getAllCustomer(): Promise<ICustomerList[] | undefined>;
  getLastId(): Promise<number | undefined>;
  saveCustomer(product: ICustomer): Promise<ICustomer | undefined>;
  getCustomer(id: number): Promise<ICustomer | undefined>;
  updateCustomer(product: ICustomer): Promise<boolean | undefined>;
}

export class CustomerApiClient implements ICustomerApiClient {
  CustomerApiClient: IApiClient;

  constructor(CustomerApiClient: IApiClient) {
    this.CustomerApiClient = CustomerApiClient;
  }

  async getAllCustomer(): Promise<ICustomerList[] | undefined> {
    try {
      const response = await this.CustomerApiClient.get<ICustomerList[]>(`/Customers`);
      return response.length > 0 ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async saveCustomer(customer: ICustomer): Promise<ICustomer | undefined> {
    try {
      const response = await this.CustomerApiClient.post<ICustomer, ICustomer>(
        `/Products`,
        customer
      );
      return response.data ? response.data : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
  async getCustomer(id: number): Promise<ICustomer | undefined> {
    try {
      const response = await this.CustomerApiClient.get<ICustomer>(`/Customers/${id}`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async getLastId(): Promise<number | undefined> {
    try {
      const response = await this.CustomerApiClient.get<number>(`/Customers/getLastId`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async updateCustomer(customer: ICustomer): Promise<boolean | undefined> {
    try {
      const response = await this.CustomerApiClient.put<ICustomer, number>(
        `/Products/${customer.id}`,
        customer
      );
      return response === 1;
    } catch (exception) {
      console.error(exception);
    }
  }
}
export default class CustomerService {
  CustomerApiClient: CustomerApiClient;

  constructor(CustomerApiClient: CustomerApiClient) {
    this.CustomerApiClient = CustomerApiClient;
  }

  async getAllCustomer(): Promise<ICustomerList[] | undefined> {
    return this.CustomerApiClient.getAllCustomer();
  }
  async getLastId(): Promise<number | undefined> {
    return this.CustomerApiClient.getLastId();
  }
  async updateCustomer(product: ICustomer): Promise<boolean | undefined> {
    const response = await this.CustomerApiClient.updateCustomer(product);
    return response;
  }
  async saveCustomer(product: ICustomer): Promise<ICustomer | undefined> {
    const response = await this.CustomerApiClient.saveCustomer(product);
    return response;
  }
  async getCustomer(id: number): Promise<ICustomer | undefined> {
    const response = await this.CustomerApiClient.getCustomer(id);
    return response;
  }
}
