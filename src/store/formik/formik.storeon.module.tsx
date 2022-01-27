import { createStoreon, StoreonModule } from 'storeon';
import { FormikState } from './formik.state';
import { FormikEvents, FormikEventKeys } from './formik.events';
import IFormikError from 'models/FormikErrors';

export const FormikModule: StoreonModule<FormikState, FormikEvents> = (store) => {
  store.on(FormikEventKeys.DeleteErrorsEvent, (state) => ({ errors: [] }));

  store.on(FormikEventKeys.SetErrorsEvent, (state, errors: IFormikError[]) => {
    return { errors: errors };
  });
};

export const FormikStore = createStoreon<FormikState, FormikEvents>([FormikModule]);
