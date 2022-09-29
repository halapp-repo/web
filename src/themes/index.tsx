import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider,ThemeOptions } from '@mui/material/styles';

import Palette from './palette';
import Typography from './typography';
import componentsOverride from './overrides';


// ==============================|| DEFAULT THEME - MAIN  ||============================== //

type Props={
    children:JSX.Element
}

export default function ThemeCustomization({ children }:Props) {
    const theme= Palette();
    const themeTypography = Typography(`-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`);

    const themeOptions = useMemo(
        ():ThemeOptions => ({
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
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}