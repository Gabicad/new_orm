import React from 'react';
import { userService } from '../services/api';
import { useStoreon } from 'storeon/react';
import { AuthEvents, IAuthUser } from '../store/core/AuthStore';
import { Grid, Paper, Avatar, Button, Typography, Link } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import { InitialUser, IUser } from '../models/User';
import { FormikEventKeys, FormikStore } from '../store/formik';
import { UserEventKeys } from '../store/user';
import { Simulate } from 'react-dom/test-utils';
interface ILogin {
  username: string;
  password: string;
}

const Login = () => {
  const { dispatch, loggedIn } = useStoreon<IAuthUser, AuthEvents>('loggedIn');

  const paperStyle = { padding: 20, height: '60vh', width: 280, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };
  return (
    <div className="App">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid alignItems="center" justifyContent="center" alignContent="center">
            <Avatar style={avatarStyle}>
              <LockOutlined />
            </Avatar>
            <h2>Belépés</h2>
          </Grid>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (
              values: ILogin,
              { setSubmitting, setErrors }: FormikHelpers<ILogin>
            ) => {
              FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
              console.log(values);
              const response = await userService.login(values);

              if (response === undefined || !response) {
                const errors = FormikStore.get();
                const formikErrors = errors.errors as FormikErrors<ILogin>;
                setErrors(formikErrors);
              } else {
                dispatch('Login', response);
              }
              setSubmitting(false);
            }}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  id="username"
                  className="m-2"
                  component={TextField}
                  name="username"
                  type="text"
                  label="username"
                  fullWidth
                />
                <Field
                  id="password"
                  className="m-2"
                  component={TextField}
                  type="password"
                  label="Jelszó"
                  name="password"
                  fullWidth
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnStyle}
                  disabled={isSubmitting}
                  fullWidth>
                  Belépés
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </div>
  );
};
export default Login;
