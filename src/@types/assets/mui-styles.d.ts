import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    blackNWhite?: PaletteColorOptions;
    admin?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blackNWhite: true;
    admin: true;
  }
}
