import { Box, Grid } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

const PageWrapper = (props: Props) => (
  <Box>
    <Grid container direction="column" justifyContent="flex-start">
      <Grid item xs={props.xs || 12} container justifyContent="center" alignItems="center">
        <Grid item xs={props.xs || 12} {...props}>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default PageWrapper;
