declare module '@mui/material/styles' {
  interface Palette {
    brown: Palette['primary'];
    deeporange: Palette['primary'];
    error: Palette['primary'];
    green: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    brown?: PaletteOptions['primary'];
    deeporange?: PaletteOptions['primary'];
    error?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    brown: true;
    deeporange: true;
    error: true;
    green: true;
  }
}
