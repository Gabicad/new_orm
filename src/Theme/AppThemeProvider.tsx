import React, { ReactElement } from 'react';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { useThemeContext } from './ThemeContextProvider';

interface AppThemeProviderProps {
  children: ReactElement;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;
