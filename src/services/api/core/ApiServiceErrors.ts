import axios, { AxiosError } from 'axios';
import { FormikStore, FormikEventKeys } from '../../../store/formik';
import { snackStore } from '../../../store/core/SnackStore';

export const handleServiceError = (err: Error | AxiosError | any): void => {
  if (axios.isAxiosError(err)) {
    const errorMsgs = err?.response?.data?.errors ?? err?.response?.data;
    if (err?.response?.status === 422) {
      Object.keys(errorMsgs).map((key, index) => {
        errorMsgs[key] = errorMsgs[key].join(', ');
      });
      FormikStore.dispatch(FormikEventKeys.SetErrorsEvent, errorMsgs);
      snackStore.dispatch('setMessage', {
        message: err.response.data.message,
        open: true,
        type: 'error'
      });
    } else if (err?.response?.status === 401) {
      snackStore.dispatch('setMessage', {
        message: err.response.data.message,
        open: true,
        type: 'error'
      });
    }
  }
};
