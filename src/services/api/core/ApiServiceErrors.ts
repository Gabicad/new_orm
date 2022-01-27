import axios, { AxiosError } from 'axios';
import { FormikStore, FormikEventKeys } from '../../../store/formik';

export const handleServiceError = (err: Error | AxiosError | any): void => {
  if (axios.isAxiosError(err)) {
    if (err?.response?.status === 422) {
      const errorMsgs = err.response.data;
      Object.keys(errorMsgs).map((key, index) => {
        errorMsgs[key] = errorMsgs[key].join(', ');
      });
      FormikStore.dispatch(FormikEventKeys.SetErrorsEvent, errorMsgs);
    }
  }
};
