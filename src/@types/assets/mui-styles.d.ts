import { PaletteColorOptions } from '@mui/material';
import { ButtonPropsColorOverrides } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    blackNWhite?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blackNWhite: true;
  }
}
