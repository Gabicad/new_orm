import * as React from 'react';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IOfferDetail } from '../../models/Offers';

interface ChipPropsColorOverrides {
  [key: string]: string;
}
export default function OffersForProduct({ data }: { data: IOfferDetail[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              ID
            </TableCell>
            <TableCell component="th" scope="row">
              Státusz
            </TableCell>
            <TableCell component="th" scope="row">
              Számlázás
            </TableCell>
            <TableCell component="th" scope="row">
              Szállítás
            </TableCell>
            <TableCell component="th" scope="row">
              Készítés Ideje
            </TableCell>
            <TableCell component="th" scope="row">
              Termék neve
            </TableCell>
            <TableCell component="th" scope="row">
              Mennyiség
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
                <Chip label={row.offer?.offer_status?.name || 'Nincs'} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.offer?.invoice_address?.full_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.offer?.ship_address?.full_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.offer?.offer_date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.quantity}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.price}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.price}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
