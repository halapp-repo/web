import { Box, Grid } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => (
  <Box>
    <Grid container direction="column" justifyContent="flex-start">
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
