import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsColorOverrides } from '@mui/material/Button/Button';

interface IPageBarButton<T> {
  onClick: (item?: T) => void;
  title: string;
  icon?: SvgIconComponent;
  color: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
}

export interface IPageBar<T> {
  title: string;
  buttons?: IPageBarButton<T>[];
}

export default function PageBar<T extends Record<string, any>>({
  item,
  pageProps
}: {
  item?: T;
  pageProps: IPageBar<T>;
}) {
  const handleMenuItemClick = (onClick: (item?: T) => void) => {
    if (item) {
      onClick(item);
    } else {
      onClick();
    }
  };
  console.log(pageProps);
  return (
    <Grid container spacing={2} direction="row" sx={{ mb: 5 }}>
      <Grid item>
        <Typography variant="h1" component="div" gutterBottom>
          {pageProps.title}
        </Typography>
      </Grid>
      <Grid item>
        {pageProps?.buttons &&
          pageProps?.buttons.map((button) => {
            const { title, onClick, icon, color } = button;
            return (
              <Button
                key={title}
                onClick={() => handleMenuItemClick(onClick)}
                variant="outlined"
                sx={{ mr: 2 }}
                color={color}
                startIcon={icon && React.createElement(icon, {})}>
                {button.title}
              </Button>
            );
          })}
      </Grid>
    </Grid>
  );
}
