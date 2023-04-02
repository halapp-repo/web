// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import trLocale from 'date-fns/locale/tr';
import { useMemo } from 'react';

import componentsOverride from './overrides';
import Palette from './palette';
import Typography from './typography';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

type Props = {
  children: JSX.Element;
};

export default function ThemeCustomization({ children }: Props) {
  const theme = Palette();
  const themeTypography = Typography(
    `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`
  );

  const themeOptions = useMemo(
    (): ThemeOptions => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      typography: themeTypography
    }),
    [theme, themeTypography]
  );
  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <LocalizationProvider
          localeText={{
            cancelButtonLabel: 'iptal',
            okButtonLabel: 'onay'
          }}
          dateAdapter={AdapterDateFns}
          adapterLocale={trLocale}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
