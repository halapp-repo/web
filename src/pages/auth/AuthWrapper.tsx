import { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => (
  <Box>
    <Grid
      container
      direction="column"
      sx={{
        minHeight: {
          xs: '100vh',
          md: '100%'
        }
      }}
      justifyContent="flex-start">
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={5}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
