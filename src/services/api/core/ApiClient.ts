import { AxiosInstance, AxiosResponse } from 'axios';
import { RequestConfig } from './RequestConfig';
import { handleServiceError } from './ApiServiceErrors';
export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<AxiosResponse<TResponse>>;
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string): Promise<TResponse>;
  delete<TResponse>(path: string): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(apiConfiguration: AxiosInstance): AxiosInstance {
    return apiConfiguration;
  }

  constructor(apiConfiguration: AxiosInstance) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, payload, config)
        : await this.client.post<TResponse>(path, payload);

      return response;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as AxiosResponse<TResponse>;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      //  handleServiceError(error);
    }
    return {} as TResponse;
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      //  handleServiceError(error);
    }
    return {} as TResponse;
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path);
      return response.data;
    } catch (error) {
      //  handleServiceError(error);
    }
    return {} as TResponse;
  }
}
