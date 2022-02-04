import ApiClient from './core/ApiClient';

import UserService, { UserApiClient } from './contracts/UserService';
import ProductService, { ProductApiClient } from './contracts/ProductService';
import AxiosClient from './core/AxiosInstance';

// other services you might want to set up...
const AxiosApiClient = new ApiClient(AxiosClient);

const userApiClient = new UserApiClient(AxiosApiClient);
export const userService = new UserService(userApiClient);

const productApiClient = new ProductApiClient(AxiosApiClient);
export const productService = new ProductService(productApiClient);
