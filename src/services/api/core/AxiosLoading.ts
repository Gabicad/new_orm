import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import AxiosClient from './AxiosInstance';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter((counter) => counter + 1), [setCounter]); // add to counter
  const dec = useCallback(() => setCounter((counter) => counter - 1), [setCounter]); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config: AxiosRequestConfig) => (inc(), config),
      response: (response: AxiosResponse) => (dec(), response),
      error: (error: AxiosError) => (dec(), Promise.reject(error))
    }),
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = AxiosClient.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    // add response interceptors
    const resInterceptor = AxiosClient.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );
    return () => {
      // remove all intercepts when done
      AxiosClient.interceptors.request.eject(reqInterceptor);
      AxiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [counter]);

  return [counter > 0];
};
