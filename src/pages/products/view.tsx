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
  Button,
  Divider
} from '@mui/material';
import { InlineList, InlineListItem } from './../../libraries/InlineList';
import parse from 'html-react-parser';
import { Edit, AddCircle } from '@mui/icons-material';
import { IProduct, IProductFeature, IProductImages } from '../../models/Product';
import { getImageSrc } from '../../libraries/ImageSrc';
import PageBar, { IPageBar } from '../../components/PageBar';

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

  const pageBar: IPageBar<IProduct> = {
    title: 'Termék adatlap',
    buttons: [
      {
        icon: AddCircle,
        title: 'Új termék',
        color: 'primary',
        onClick: () => {
          history(`/Product/new`);
        }
      },
      {
        icon: Edit,
        title: 'Módosítás',
        color: 'warning',
        onClick: (item: IProduct | undefined) => {
          history(`/Product/edit/${item?.id}`);
        }
      }
    ]
  };

  return (
    <>
      <PageBar item={currentProduct} pageProps={pageBar} />
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
            <Divider />
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
            <Divider />
          </Grid>
          {currentProduct.description_short && (
            <Grid item xs={12} md={12}>
              <InlineList dense>
                <InlineListItem>
                  <ListItemText
                    primary="Rövid leírás"
                    secondaryTypographyProps={{
                      style: {
                        whiteSpace: 'break-spaces'
                      }
                    }}
                    secondary={parse(currentProduct.description_short)}
                  />
                </InlineListItem>
              </InlineList>
              <Divider />
            </Grid>
          )}
          {currentProduct.description && (
            <Grid item xs={12} md={12}>
              <InlineList dense>
                <InlineListItem>
                  <ListItemText
                    secondaryTypographyProps={{
                      style: {
                        whiteSpace: 'break-spaces'
                      }
                    }}
                    primary="Leírás"
                    secondary={parse(currentProduct.description)}
                  />
                </InlineListItem>
              </InlineList>
              <Divider />
            </Grid>
          )}
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
