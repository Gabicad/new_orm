import { Button, LinearProgress } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { IUser, InitialUser } from '../../models/User';
import { userService } from '../../services/api';
import { FormikErrors } from 'formik';
import { FormikEventKeys, FormikStore } from '../../store/formik';
import { IDialogFormikProps } from '../../models/DialogFormik';
import { UserStore, UserEventKeys } from '../../store/user';

const UserForm: React.FC<IDialogFormikProps> = ({ handleClose }: IDialogFormikProps) => {
  return (
    <Formik
      initialValues={InitialUser}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
        const data = await userService.saveUser(values);
        if (data === undefined) {
          const errors = FormikStore.get();
          const formikErrors = errors.errors as FormikErrors<IUser>;
          setErrors(formikErrors);
        } else {
          UserStore.dispatch(UserEventKeys.SaveUserEvent, values);
          if (handleClose !== undefined) {
            handleClose();
          }
        }
      }}>
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field className="m-2" component={TextField} name="name" type="text" label="Név" />
          <Field className="m-2" component={TextField} name="email" type="email" label="Email" />
          <Field className="m-2" component={TextField} name="phone" type="text" label="Telefon" />
          <Field
            className="m-2"
            component={TextField}
            name="email_alias"
            type="text"
            label="Email alias"
          />
          <Field
            className="m-2"
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          <br />
          <br />

          {isSubmitting && <LinearProgress />}
          <br />
          <br />
          <br />
          <br />
          <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
            Mentés
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default UserForm;
