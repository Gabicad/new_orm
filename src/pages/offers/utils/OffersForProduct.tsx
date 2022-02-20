import * as React from 'react';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IOffer, IOfferDetail } from '../../../models/Offers';
import NumberFormat from 'react-number-format';
import { ActionMenu, IActionMenu } from '../../../components/TableActionMenu';
import parse from 'html-react-parser';
import { Pageview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import OffersForProductCard from './OffersForProductCard';
export default function OffersForProduct({ data }: { data: IOfferDetail[] }) {
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
  if (isMobile) {
    return <OffersForProductCard data={data} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              Rendelés ID
            </TableCell>
            <TableCell component="th" scope="row">
              Státusz
            </TableCell>
            <TableCell component="th" scope="row">
              Ügyfél
            </TableCell>
            <TableCell component="th" scope="row">
              Készítés Ideje
            </TableCell>
            <TableCell component="th" scope="row">
              Termék neve
            </TableCell>
            <TableCell component="th" scope="row">
              db
            </TableCell>
            <TableCell component="th" scope="row">
              Ár
            </TableCell>
            <TableCell component="th" scope="row">
              Megjegyzés
            </TableCell>
            <TableCell component="th" scope="row"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IOfferDetail) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.offer?.id}
              </TableCell>
              <TableCell component="th" scope="row">
                <Chip
                  size="small"
                  color={row?.offer?.offer_status?.color}
                  label={row.offer?.offer_status?.name || 'Nincs'}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.offer?.customer?.display_name}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                {row.offer?.offer_date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                {row.quantity} db
              </TableCell>
              <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                <NumberFormat
                  value={row.price}
                  displayType={'text'}
                  thousandSeparator=" "
                  suffix={' Ft'}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.extra_info && parse(row.extra_info)}
              </TableCell>
              <TableCell component="th" scope="row">
                {ActionMenu(row.offer, ActionItemsOffer)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
