import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { ProductState, ProductEvents, ProductEventKeys } from '../../store/product';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ImageListItem,
  ImageList
} from '@mui/material';
import { IProduct, IProductFeature, IProductImages } from '../../models/Product';
const productView = () => {
  const { dispatch, currentProduct } = useStoreon<ProductState, ProductEvents>('currentProduct');
  const history = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    dispatch(ProductEventKeys.GetProductsEvent, Number(id));
  }, [id]);
  useEffect(() => () => dispatch(ProductEventKeys.ClearStateEvent), []);
  if (currentProduct === undefined) {
    return <></>;
  }

  return (
    <>
      <Typography variant="h1" component="div" gutterBottom>
        Termék Adatlap
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <List dense>
            <ListItem>
              <ListItemText primary="Azonosító" secondary={currentProduct.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Név" secondary={currentProduct.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Aktív" secondary={currentProduct.active ? 'Igen' : 'Nem'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="price" secondary={currentProduct.price} />
            </ListItem>
            <ListItem>
              <ListItemText primary="manufacturer" secondary={currentProduct.manufacturer?.name} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <List dense>
            {currentProduct.product_features.map((feature: IProductFeature) => {
              return (
                <ListItem key={feature.id}>
                  <ListItemText primary={feature.name} secondary={feature.value} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageList sx={{ width: 300, height: 'auto' }} cols={3} rowHeight={164}>
            {currentProduct.product_images.map((item: IProductImages) => {
              return (
                <ImageListItem key={item.id}>
                  <img
                    src={`https://mgm1.biogames.hu/storage/img/${item.product_id}/${item.id}.jpg?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`https://mgm1.biogames.hu/storage/img/${item.product_id}/${item.id}.jpg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
};

export default productView;
