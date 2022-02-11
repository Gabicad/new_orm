import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { CustomerState, CustomerEvents, CustomerEventKeys } from '../../store/customer';
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
  Divider,
  Paper
} from '@mui/material';
import { InlineList, InlineListItem } from './../../libraries/InlineList';
import parse from 'html-react-parser';
import { Edit, AddCircle } from '@mui/icons-material';
import { getImageSrc } from '../../libraries/ImageSrc';
import PageBar, { IPageBar } from '../../components/PageBar';
import { ICustomer, IInvoiceAddress, IShipAddress } from '../../models/Customer';
import SimpleTable from '../../components/SimpleTable/SimpleTable';

const customerView = () => {
  const { dispatch, currentCustomer } = useStoreon<CustomerState, CustomerEvents>(
    'currentCustomer'
  );
  const history = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    dispatch(CustomerEventKeys.GetCustomerEvent, Number(id));
  }, [id]);

  useEffect(() => () => dispatch(CustomerEventKeys.ClearStateEvent), []);
  if (currentCustomer === undefined) {
    return <></>;
  }

  const pageBar: IPageBar<ICustomer> = {
    title: 'Ügyfél adatlap',
    buttons: [
      {
        icon: AddCircle,
        title: 'Új ügyfél',
        color: 'primary',
        onClick: () => {
          history(`/Customer/new`);
        }
      },
      {
        icon: Edit,
        title: 'Módosítás',
        color: 'warning',
        onClick: (item: ICustomer | undefined) => {
          history(`/Customer/edit/${item?.id}`);
        }
      }
    ]
  };

  const shipHeader = [
    {
      title: 'Alap',
      value: 'default'
    },
    {
      title: 'Név',
      value: 'full_name'
    },
    {
      title: 'Irszám',
      value: 'zipcode'
    },
    {
      title: 'Város',
      value: 'city'
    },

    {
      title: 'Cím',
      value: 'address'
    },
    {
      title: 'Telefon',
      value: 'phone'
    },
    {
      title: 'Cég',
      value: 'company'
    },
    {
      title: 'Megjegyzés',
      value: 'comment'
    }
  ];
  const invHeader = [
    {
      title: 'Alap',
      value: 'default'
    },
    {
      title: 'Név',
      value: 'full_name'
    },
    {
      title: 'Irszám',
      value: 'zipcode'
    },
    {
      title: 'Város',
      value: 'city'
    },

    {
      title: 'Cím',
      value: 'address'
    },
    {
      title: 'Telefon',
      value: 'phone'
    },
    {
      title: 'Cég',
      value: 'company'
    },
    {
      title: 'Adószám',
      value: 'tax_number'
    },
    {
      title: 'Megjegyzés',
      value: 'comment'
    }
  ];
  return (
    <>
      <PageBar item={currentCustomer} pageProps={pageBar} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper>
            <Typography p={2} variant="h3" component="div" gutterBottom>
              Alap adatok
            </Typography>
            <InlineList dense>
              <InlineListItem>
                <ListItemText primary="Azonosító" secondary={currentCustomer.id} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Név" secondary={currentCustomer.full_name} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="E-mail" secondary={currentCustomer.email} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Típus" secondary={currentCustomer.type} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Telefon" secondary={currentCustomer.phone} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Cég" secondary={currentCustomer.company} />
              </InlineListItem>
              <InlineListItem>
                <ListItemText primary="Bank" secondary={currentCustomer.bank_account} />
              </InlineListItem>
            </InlineList>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12} sx={{ mb: 5 }}>
            {currentCustomer.ship_addresses && (
              <>
                <Typography variant="h3" component="div" gutterBottom>
                  Szállítási címek
                </Typography>
                <SimpleTable header={shipHeader} data={currentCustomer.ship_addresses} />
              </>
            )}
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            {currentCustomer.invoice_addresses && (
              <>
                <Typography variant="h3" component="div" gutterBottom>
                  Számlázási címek
                </Typography>
                <SimpleTable header={invHeader} data={currentCustomer.invoice_addresses} />
              </>
            )}

            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default customerView;
