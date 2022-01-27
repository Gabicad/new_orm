import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { appConfig } from '../../../config/AppConfig';

const axiosConfig: AxiosRequestConfig = {
  baseURL: appConfig.apiBaseUrl,
  responseType: 'json' as const,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10 * 1000
};

const AxiosClient = Axios.create(axiosConfig);

/*
// Step-2: Create request, response & error handlers
const requestHandler = (request: AxiosRequestConfig) => {
  ApplicationStore.dispatch(ApplicationEventKeys.SetLoadingEvent, true);
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  ApplicationStore.dispatch(ApplicationEventKeys.SetLoadingEvent, false);
  return response;
};

const errorHandler = (error: AxiosError) => {
  ApplicationStore.dispatch(ApplicationEventKeys.SetLoadingEvent, false);
  return Promise.reject(error);
};
// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
AxiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

AxiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

AxiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
*/
export default AxiosClient;
