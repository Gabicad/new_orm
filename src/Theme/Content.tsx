import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AppContentViewWrapper from './AppContentViewWrapper';
import Routing from '../router';
import AppSuspense from '../components/AppSuspense';
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © ORM '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ContentComponent: React.FC<React.ReactNode> = () => {
  return (
    <Box
      component="main"
      sx={{
        mt: '50px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        display: 'flex'
      }}>
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <AppContentViewWrapper>
          <AppSuspense />
          <Routing />
        </AppContentViewWrapper>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default ContentComponent;
