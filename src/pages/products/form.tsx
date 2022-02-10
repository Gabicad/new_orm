import { Button, Grid, Typography } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { IUser, InitialUser } from '../../models/User';
import { userService } from '../../services/api';
import { FormikErrors } from 'formik';
import { FormikEventKeys, FormikStore } from '../../store/formik';
import { IDialogFormikProps } from '../../models/DialogFormik';
import { UserEventKeys, UserState, UserEvents } from '../../store/user';
import { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { AddCircle, Edit } from '@mui/icons-material';

const UserForm: React.FC<IDialogFormikProps<IUser>> = ({
  handleClose,
  data = undefined
}: IDialogFormikProps<IUser>) => {
  const { dispatch } = useStoreon<UserState, UserEvents>('users');
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item>
          <Typography variant="h1" component="div" gutterBottom>
            Új termék
          </Typography>
        </Grid>
      </Grid>

      <br />
      <Formik
        initialValues={data ?? InitialUser}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
          let response;
          if (data === undefined) {
            response = await userService.saveUser(values);
          } else {
            response = await userService.updateUser(values);
          }

          if (response === undefined || !response) {
            const errors = FormikStore.get();
            const formikErrors = errors.errors as FormikErrors<IUser>;
            setErrors(formikErrors);
          } else {
            if (data === undefined) {
              dispatch(UserEventKeys.SaveUserEvent, values);
            } else {
              dispatch(UserEventKeys.UpdateUserEvent, values);
            }

            if (handleClose !== undefined) {
              handleClose();
            }
          }
        }}>
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="name"
                  type="text"
                  label="Termék neve"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="reference"
                  type="text"
                  label="Cikkszám"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="phone"
                  type="text"
                  label="Telefon"
                />

                <br />
                <br />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}>
                  Mentés
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default UserForm;
