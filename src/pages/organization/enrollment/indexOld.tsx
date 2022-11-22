import { useState } from 'react';
import { Box, Grid, useMediaQuery, Theme } from '@mui/material';
import MainCard from '../../../components/MainCard';
import { AddressMap } from './AddressMap';
import { EnrollmentForm } from './EnrollmentForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createOrganizationEnrollmentRequest,
  selectOrganizationEnrollment
} from '../../../store/organizations/organizationsSlice';
//import { OrganizationEnrollmentDTO } from '../../../models/dtos/organization-enrollment.dto';
import PostEnrollment from './PostEnrollment';

const Enrollment = () => {
  const dispatch = useAppDispatch();
  const enrollmentRequest = useAppSelector(selectOrganizationEnrollment);

  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [location, setLocation] = useState({} as { [key in 'LNG' | 'LAT']: string });
  const handleLocationChanged = (lat: string, lng: string) => {
    setLocation({
      LAT: lat,
      LNG: lng
    });
  };
  const handleSubmitForm = (arg: any) => {
    // dispatch(createOrganizationEnrollmentRequest(arg));
  };
  const createEnrollmentPage = () => {
    if (enrollmentRequest?.DidSendOrganizationEnrollment) {
      return (
        <Box>
          <Grid
            container
            rowSpacing={4.5}
            justifyContent="center"
            columnSpacing={2.75}
            alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <MainCard sx={{ p: 5 }}>
                <PostEnrollment />
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      );
    }
    return (
      <Box>
        <Grid
          container
          rowSpacing={4.5}
          justifyContent="left"
          columnSpacing={2.75}
          alignItems="left">
          <Grid item xs={12} md={6}>
            <MainCard sx={{ p: 5 }}>
              <EnrollmentForm
                onLocationChanged={handleLocationChanged}
                onSubmit={handleSubmitForm}
              />
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

  return createEnrollmentPage();
};

export default Enrollment;
