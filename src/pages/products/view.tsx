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
  Divider,
  ImageListItemBar,
  IconButton,
  Icon
} from '@mui/material';
import { InlineList, InlineListItem } from './../../libraries/InlineList';
import parse from 'html-react-parser';
import { Edit, AddCircle, DeleteForever } from '@mui/icons-material';
import { IProduct, IProductFeature, IProductImages } from '../../models/Product';
import { getImageSrc } from '../../libraries/ImageSrc';
import PageBar, { IPageBar } from '../../components/PageBar';
import SimpleTable from '../../components/SimpleTable/SimpleTable';
import OfferForProduct from '../../components/OfferUtils/OffersForProduct';
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

  const handleDelete = async (item: IProductImages) => {
    dispatch(ProductEventKeys.DeleteProductImageEvent, item.id);
  };

  const offerHeader = [
    {
      title: 'Alap',
      value: 'offer.id'
    },
    {
      title: 'Név',
      value: 'product_name'
    }
  ];

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
                    <ImageListItemBar
                      actionIcon={
                        <IconButton
                          onClick={() => handleDelete(item)}
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                          <Icon>DeleteForever</Icon>
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </Grid>

        <Grid item xs={12} md={12} sx={{ mb: 5 }}>
          {currentProduct.offer_details && (
            <>
              <Typography variant="h3" component="div" gutterBottom>
                Árajánlatok
              </Typography>
              <OfferForProduct data={currentProduct.offer_details} />
            </>
          )}
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default productView;
