import * as React from 'react';
import BasicCard from './BasicCard';
import { Grid } from '@mui/material';

export default function CardList<T extends Record<string, any>>({ datas }: { datas: T[] }) {
  return (
    <>
      <Grid container spacing={1}>
        {datas.map((data) => (
          <Grid key={data.id} item xs={12} lg={4}>
            <BasicCard data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
