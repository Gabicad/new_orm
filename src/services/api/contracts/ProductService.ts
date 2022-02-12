import { IApiClient } from '../core/ApiClient';

import { IProductList, IProduct } from '../../../models/Product';

export interface IProductApiClient {
  getAllProduct(): Promise<IProductList[] | undefined>;
  getLastId(): Promise<number | undefined>;
  saveProduct(product: IProduct): Promise<IProduct | undefined>;
  getProduct(id: number): Promise<IProduct | undefined>;
  deleteImage(id: number): Promise<boolean | undefined>;
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

  async saveProduct(product: IProduct): Promise<IProduct | undefined> {
    try {
      const response = await this.ProductApiClient.post<IProduct, IProduct>(`/Products`, product);
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

  async getLastId(): Promise<number | undefined> {
    try {
      const response = await this.ProductApiClient.get<number>(`/Products/getLastId`);
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
  async getLastId(): Promise<number | undefined> {
    return this.ProductApiClient.getLastId();
  }
  async updateProduct(product: IProduct): Promise<boolean | undefined> {
    const response = await this.ProductApiClient.updateProduct(product);
    return response;
  }
  async deleteImage(id: number): Promise<boolean | undefined> {
    const response = await this.ProductApiClient.deleteImage(id);
    return response;
  }
  async saveProduct(product: IProduct): Promise<IProduct | undefined> {
    const response = await this.ProductApiClient.saveProduct(product);
    return response;
  }
  async getProduct(id: number): Promise<IProduct | undefined> {
    const response = await this.ProductApiClient.getProduct(id);
    return response;
  }
}
