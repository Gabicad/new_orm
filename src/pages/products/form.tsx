import {
  AutocompleteRenderInputParams,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { TextField as TextFieldMUI } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField, Autocomplete } from 'formik-mui';
import * as React from 'react';
import { productService } from '../../services/api';
import { FormikErrors } from 'formik';
import { FormikEventKeys, FormikStore } from '../../store/formik';
import { IDialogFormikProps } from '../../models/DialogFormik';
import { useStoreon } from 'storeon/react';
import { InitialProduct, IProduct } from 'models/Product';
import { ProductEventKeys, ProductEvents, ProductState } from 'store/product';
import { useEffect } from 'react';

const ProductForm: React.FC<IDialogFormikProps<IProduct>> = ({
  handleClose,
  data = undefined
}: IDialogFormikProps<IProduct>) => {
  const { dispatch, manufacturers } = useStoreon<ProductState, ProductEvents>('manufacturers');

  useEffect(() => {
    dispatch(ProductEventKeys.GetAllManufacturersEvent);
  }, []);

  return (
    <>
      <Formik
        initialValues={data ?? InitialProduct}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
          let response;
          if (data === undefined) {
            // response = await userService.saveUser(values);
          } else {
            //response = await userService.updateUser(values);
          }

          if (response === undefined || !response) {
            const errors = FormikStore.get();
            const formikErrors = errors.errors as FormikErrors<IProduct>;
            setErrors(formikErrors);
          } else {
            if (data === undefined) {
              //  dispatch(UserEventKeys.SaveUserEvent, values);
            } else {
              //  dispatch(UserEventKeys.UpdateUserEvent, values);
            }

            if (handleClose !== undefined) {
              handleClose();
            }
          }
        }}>
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="name"
                  type="text"
                  label="Termék neve"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="reference"
                  type="text"
                  label="Cikkszám"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Field
                  fullWidth
                  name="manufacturer_id"
                  component={Autocomplete}
                  options={manufacturers}
                  getOptionLabel={(option: Record<string, any>) => option.name}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextFieldMUI
                      {...params}
                      // We have to manually set the corresponding fields on the input component
                      label="Gyártó"
                      name="manufacturer_id"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider />
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="h3" component="div" gutterBottom>
                            Termék tulajdonságok
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">asdf</TableCell>
                        <TableCell align="center">asdf</TableCell>
                        <TableCell align="center">asdf</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={12}>
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
export default ProductForm;
