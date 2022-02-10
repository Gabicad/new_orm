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
  ImageList,
  Button
} from '@mui/material';
import { InlineList, InlineListItem } from './../../libraries/InlineList';

import { Edit, AddCircle } from '@mui/icons-material';
import { IProduct, IProductFeature, IProductImages } from '../../models/Product';
import { getImageSrc } from '../../libraries/ImageSrc';

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
      <Grid container spacing={2} direction="row" sx={{ mb: 5 }}>
        <Grid item>
          <Typography variant="h1" component="div" gutterBottom>
            Termék Adatlap
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              history(`/Product/new`);
            }}
            variant="outlined"
            sx={{ mr: 2 }}
            startIcon={<AddCircle />}>
            Új termék
          </Button>
          <Button
            onClick={() => {
              history(`/Product/edit/${id}`);
            }}
            variant="outlined"
            color="warning"
            startIcon={<Edit />}>
            Módosítás
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12}>
            <InlineList dense>
              <InlineListItem>
                <ListItemText primary="Azonosító" secondary={currentProduct.id} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Név" secondary={currentProduct.name} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Aktív" secondary={currentProduct.active ? 'Igen' : 'Nem'} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Ár" secondary={currentProduct.price} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Gyártó" secondary={currentProduct.manufacturer?.name} />
              </InlineListItem>
            </InlineList>
          </Grid>
          <Grid item xs={12} md={12}>
            <InlineList dense>
              {currentProduct.product_features &&
                currentProduct.product_features.map((feature: IProductFeature) => {
                  return (
                    <InlineListItem key={feature.id}>
                      <ListItemText primary={feature.name} secondary={feature.value} />
                    </InlineListItem>
                  );
                })}
            </InlineList>
          </Grid>
          <Grid item xs={12} md={12}>
            <InlineList dense>
              <InlineListItem>
                <ListItemText primary="Leírás" secondary={currentProduct.description} />
              </InlineListItem>
            </InlineList>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} sx={{ minHeight: '200px' }}>
          {currentProduct.product_images && (
            <ImageList variant="masonry" sx={{ width: '100%', height: 'auto' }} cols={4}>
              {currentProduct.product_images.map((item: IProductImages) => {
                return (
                  <ImageListItem key={item.id}>
                    <img src={getImageSrc(item)} srcSet={getImageSrc(item)} loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default productView;
