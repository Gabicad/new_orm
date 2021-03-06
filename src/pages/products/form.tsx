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

  const handleDeleteButton = (item: any) => {
    const newProps = properties.filter((prop) => prop !== item);
    setProperties([...newProps]);
  };

  let load: INewProduct;
  if (data !== undefined) {
    load = {
      name: data.name,
      reference: data.reference,
      manufacturer_id: data?.manufacturer_id?.toString() || ''
    };
  } else {
    load = InitialProduct;
  }

  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Formik
        initialValues={load}
        onSubmit={async (values: INewProduct, { setSubmitting, setErrors }) => {
          FormikStore.dispatch(FormikEventKeys.DeleteErrorsEvent);
          let response;
          if (data === undefined) {
            const formData = new FormData();
            if (fileRef?.current?.files && fileRef?.current?.files.length > 0) {
              Array.from(fileRef.current.files).forEach((file: any, index: number) => {
                formData.append('files[' + index + ']', file);
              });
            }
            if (properties && properties.length > 0) {
              formData.append('productFeatures', JSON.stringify(properties));
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
                  label="Term??k neve"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Field
                  fullWidth
                  className="m-2"
                  component={TextField}
                  name="reference"
                  type="text"
                  label="Cikksz??m"
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
                      label="Gy??rt??"
                      name="manufacturer"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              {data === undefined && (
                <>
                  <Grid item xs={12} md={12}>
                    <Divider />
                    <Typography>K??pek</Typography>
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
                                Term??k tulajdons??gok
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
                                label="Tulajdons??g"
                                variant="standard"
                                value={property}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldMUI
                                onChange={(e) => setPropertyValue(e.target.value)}
                                id="standard-basic"
                                label="??rt??k"
                                variant="standard"
                                value={propertyValue}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Button color="primary" onClick={handleAddButton}>
                                Hozz??ad
                              </Button>
                            </TableCell>
                          </TableRow>
                          {properties.map((property) => (
                            <TableRow
                              key={property.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell size="small" align="center">
                                {property.name}
                              </TableCell>
                              <TableCell size="small" align="center">
                                {property.value}
                              </TableCell>
                              <TableCell size="small" align="center">
                                <Button color="error" onClick={() => handleDeleteButton(property)}>
                                  T??rl??s
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </>
              )}

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
                  Ment??s
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
