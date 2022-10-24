import { Box, Grid, useMediaQuery, Theme } from '@mui/material';
import MainCard from '../../../components/MainCard';
import { AddressMap } from './AddressMap';
import { PreSignUpForm } from './PreSignupForm';

const PreSignup = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} md={6}>
          <MainCard sx={{ p: 5 }}>
            <PreSignUpForm />
          </MainCard>
        </Grid>
        {!matchesMd && (
          <Grid item md={6}>
            <MainCard
              sx={{
                p: 1
              }}>
              <AddressMap />
            </MainCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PreSignup;
