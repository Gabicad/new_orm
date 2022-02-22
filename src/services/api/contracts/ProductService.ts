import { IApiClient } from '../core/ApiClient';

import { IProductList, IProduct, IManufacturer } from '../../../models/Product';

export interface IProductApiClient {
  getAllProduct(): Promise<IProductList[] | undefined>;
  getAllManufacturers(): Promise<IManufacturer[] | undefined>;
  getLastModifyDateTime(): Promise<Date | undefined>;
  saveProduct(product: FormData): Promise<IProduct | undefined>;
  getProduct(id: number): Promise<IProduct | undefined>;
  deleteImage(id: number): Promise<boolean | undefined>;
  deleteProduct(id: number): Promise<boolean | undefined>;
  updateProduct(product: IProduct): Promise<boolean | undefined>;
}

export class ProductApiClient implements IProductApiClient {
  ProductApiClient: IApiClient;

  constructor(ProductApiClient: IApiClient) {
    this.ProductApiClient = ProductApiClient;
  }

  async getAllProduct(): Promise<IProductList[] | undefined> {
    try {
      const response = await this.ProductApiClient.get<IProductList[]>(`/Products`);
      return response.length > 0 ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
  async getAllManufacturers(): Promise<IManufacturer[] | undefined> {
    try {
      const response = await this.ProductApiClient.get<IManufacturer[]>(`/Manufacturers`);
      return response.length > 0 ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async saveProduct(product: FormData): Promise<IProduct | undefined> {
    try {
      const response = await this.ProductApiClient.post<FormData, IProduct>(`/Products`, product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data ? response.data : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
  async getProduct(id: number): Promise<IProduct | undefined> {
    try {
      const response = await this.ProductApiClient.get<IProduct>(`/Products/${id}`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async deleteImage(id: number): Promise<boolean | undefined> {
    try {
      const response = await this.ProductApiClient.delete<boolean>(`/ProductImages/${id}`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }
  async deleteProduct(id: number): Promise<boolean | undefined> {
    try {
      const response = await this.ProductApiClient.delete<boolean>(`/Products/${id}`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async getLastModifyDateTime(): Promise<Date | undefined> {
    try {
      const response = await this.ProductApiClient.get<Date>(`/Products/getLastModifyDateTime`);
      return response ? response : undefined;
    } catch (exception) {
      console.error(exception);
    }
  }

  async updateProduct(product: IProduct): Promise<boolean | undefined> {
    try {
      const response = await this.ProductApiClient.put<IProduct, number>(
        `/Products/${product.id}`,
        product
      );
      return response === 1;
    } catch (exception) {
      console.error(exception);
    }
  }
}
export default class ProductService {
  ProductApiClient: IProductApiClient;

  constructor(ProductApiClient: IProductApiClient) {
    this.ProductApiClient = ProductApiClient;
  }

  async getAllProduct(): Promise<IProductList[] | undefined> {
    return this.ProductApiClient.getAllProduct();
  }
  async getAllManufacturers(): Promise<IManufacturer[] | undefined> {
    return this.ProductApiClient.getAllManufacturers();
  }
  async getLastModifyDateTime(): Promise<Date | undefined> {
    return this.ProductApiClient.getLastModifyDateTime();
  }
  async updateProduct(product: IProduct): Promise<boolean | undefined> {
    const response = await this.ProductApiClient.updateProduct(product);
    return response;
  }
  async deleteImage(id: number): Promise<boolean | undefined> {
    const response = await this.ProductApiClient.deleteImage(id);
    return response;
  }
  async deleteProduct(id: number): Promise<boolean | undefined> {
    const response = await this.ProductApiClient.deleteProduct(id);
    return response;
  }
  async saveProduct(product: FormData): Promise<IProduct | undefined> {
    const response = await this.ProductApiClient.saveProduct(product);
    return response;
  }
  async getProduct(id: number): Promise<IProduct | undefined> {
    const response = await this.ProductApiClient.getProduct(id);
    return response;
  }
}
