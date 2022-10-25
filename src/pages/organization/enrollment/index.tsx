import { useState } from 'react';
import { Box, Grid, useMediaQuery, Theme } from '@mui/material';
import MainCard from '../../../components/MainCard';
import { AddressMap } from './AddressMap';
import { EnrollmentForm } from './EnrollmentForm';

const Enrollment = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [location, setLocation] = useState({} as { [key in 'LNG' | 'LAT']: string });
  const handleLocationChanged = (lat: string, lng: string) => {
    setLocation({
      LAT: lat,
      LNG: lng
    });
  };
  return (
    <Box>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} md={6}>
          <MainCard sx={{ p: 5 }}>
            <EnrollmentForm onLocationChanged={handleLocationChanged} />
          </MainCard>
        </Grid>
        {!matchesMd && (
          <Grid item md={6}>
            <MainCard
              sx={{
                p: 1,
                position: 'sticky',
                top: 80
              }}>
              <AddressMap lat={location.LAT} long={location.LNG} />
            </MainCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Enrollment;
