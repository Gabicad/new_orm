import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ISimpleTableColumn {
  title: string;
  value: string;
}

export default function SimpleTable<T extends Record<string, any>>({
  header,
  data
}: {
  header: ISimpleTableColumn[];
  data: T[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {header.map((row: ISimpleTableColumn) => (
              <TableCell key={row.title} component="th" scope="row">
                {row.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: T) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {header.map((head_val: ISimpleTableColumn) => (
                <TableCell key={head_val.value} component="th" scope="row">
                  {row[head_val.value]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
