import React from 'react';
import './loader.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

import CircularProgress from '@mui/material/CircularProgress';
const AppLoader = () => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    'border-radius': 25,
    p: 5
  };
  const Item = styled('div')(({ theme }) => ({
    ...theme.typography.h2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  return (
    <Modal open={true}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              {' '}
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>Kérem várjon</Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AppLoader;
