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
import { InitialProduct, IProduct, INewProduct } from 'models/Product';
import { ProductEventKeys, ProductEvents, ProductState } from 'store/product';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm: React.FC<IDialogFormikProps<IProduct>> = ({
  handleClose,
  data = undefined
}: IDialogFormikProps<IProduct>) => {
  const { dispatch, manufacturers } = useStoreon<ProductState, ProductEvents>('manufacturers');
  const [property, setProperty] = useState<string>('');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [properties, setProperties] = useState<Record<string, any>[]>([]);
  const history = useNavigate();
  useEffect(() => {
    dispatch(ProductEventKeys.GetAllManufacturersEvent);
  }, []);

  if (data !== undefined) {
    data.manufacturer_id = data.manufacturer?.id;
  }

  const handleAddButton = () => {
    setProperties([...properties, { name: property, value: propertyValue }]);
    setProperty('');
    setPropertyValue('');
  };

  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Formik
        initialValues={InitialProduct}
        onSubmit={async (values: INewProduct, { setSubmitting, setErrors }) => {
          FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
          let response;
          if (data === undefined) {
            const formData = new FormData();
            if (fileRef?.current?.files && fileRef?.current?.files.length > 0) {
              Array.from(fileRef.current.files).forEach((file: any) => {
                formData.append('files[]', file);
              });
            }

            formData.append('reference', values.reference);
            formData.append('name', values.name);
            if (values?.manufacturer?.id) {
              formData.append('manufacturer_id', values?.manufacturer?.id.toString());
            }

            response = await productService.saveProduct(formData);
            dispatch(ProductEventKeys.AddProductEvent, response);
          } else {
            //response = await userService.updateUser(values);
          }

          if (response === undefined || !response) {
            const errors = FormikStore.get();
            const formikErrors = errors.errors as FormikErrors<INewProduct>;
            //      setErrors(formikErrors);
          } else {
            if (handleClose !== undefined) {
              handleClose();
              history(`/Product/View/${response.id}`);
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
                  name="manufacturer"
                  component={Autocomplete}
                  options={manufacturers}
                  value={data?.manufacturer || null}
                  getOptionLabel={(option: Record<string, any>) => option.name}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextFieldMUI
                      {...params}
                      // We have to manually set the corresponding fields on the input component
                      label="Gyártó"
                      name="manufacturer"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider />
                <Typography>Képek</Typography>
                <input ref={fileRef} name="files" type="file" multiple />
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
                        <TableCell align="center">
                          <TextFieldMUI
                            onChange={(e) => setProperty(e.target.value)}
                            id="standard-basic"
                            label="Tulajdonság"
                            variant="standard"
                            value={property}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextFieldMUI
                            onChange={(e) => setPropertyValue(e.target.value)}
                            id="standard-basic"
                            label="Érték"
                            variant="standard"
                            value={propertyValue}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button color="primary" onClick={handleAddButton}>
                            Hozzáad
                          </Button>
                        </TableCell>
                      </TableRow>
                      {properties.map((property) => (
                        <TableRow
                          key={property.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{property.name}</TableCell>
                          <TableCell align="center">{property.value}</TableCell>
                          <TableCell align="center">
                            <Button color="error" onClick={handleAddButton}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
