import { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

interface Props {
  children: ReactNode;
}

const PageWrapper = ({ children }: Props) => (
  <Box>
    <Grid container direction="column" justifyContent="flex-start">
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={7}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default PageWrapper;
