import * as React from 'react';
import Chip from '@mui/material/Chip';
import { IOffer, IOfferDetail } from '../../../models/Offers';
import NumberFormat from 'react-number-format';
import { ActionMenu, IActionMenu } from '../../../components/TableActionMenu';
import parse from 'html-react-parser';
import { Pageview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function OffersForProductCard({ data }: { data: IOfferDetail[] }) {
  const history = useNavigate();
  const ActionItemsOffer: IActionMenu<IOffer>[] = [
    {
      title: 'Adatlap',
      icon: Pageview,
      onClick: (item: IOffer) => {
        history(`/Offer/view/${item.id}`);
      }
    }
  ];

  return (
    <>
      <Grid container spacing={1}>
        {data.map((row: IOfferDetail) => (
          <Grid
            key={row.id}
            container
            direction="row"
            justifyContent="left"
            spacing={2}
            sx={{ boxShadow: 3, mt: 3, p: 1 }}>
            <Grid item xs={4} md={4} className="text-start">
              <Chip
                size="small"
                color={row?.offer?.offer_status?.color}
                label={row.offer?.offer_status?.name || 'Nincs'}
              />
            </Grid>
            <Grid item xs={4} md={4} className="text-center">
              {row.offer?.offer_date}
            </Grid>
            <Grid item xs={4} md={4} className="text-end">
              {row.offer?.id}
            </Grid>
            <Grid item xs={12} md={12}>
              {row.offer?.customer?.display_name}
            </Grid>
            <Grid item xs={12} md={12}>
              {row.product_name}
            </Grid>
            {row.extra_info && (
              <Grid item xs={12} md={12}>
                {parse(row.extra_info)}
              </Grid>
            )}
            <Grid item xs={4} md={4} className="text-start">
              {row.quantity} db
            </Grid>
            <Grid item xs={4} md={4} className="text-center">
              <NumberFormat
                value={row.price}
                displayType={'text'}
                thousandSeparator=" "
                suffix={' Ft'}
              />
            </Grid>
            <Grid item xs={4} md={4} className="text-end">
              {ActionMenu(row.offer, ActionItemsOffer)}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
