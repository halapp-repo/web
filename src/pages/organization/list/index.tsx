import { Box, CircularProgress, Divider, List, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import { RetryOnError } from '../../../components/RetryOnError';
import { Organization } from '../../../models/organization';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchOrganizations,
  selectOrganizationIsLoading,
  selectOrganizations
} from '../../../store/organizations/organizationsSlice';
import { OrganizationListItem } from './OrganizationListItem';

const OrganizationList = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const organizations = useAppSelector(selectOrganizations);
  const isLoading = useAppSelector(selectOrganizationIsLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    } else {
      if (!organizations) {
        dispatch(fetchOrganizations());
      }
    }
  }, [userAuth]);

  const handleRetry = () => {
    dispatch(fetchOrganizations());
  };

  const getContent = (organizations: Organization[] | null | undefined, isLoading: boolean) => {
    if (isLoading || typeof organizations === 'undefined') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    } else if (organizations === null) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <RetryOnError HandleRetry={handleRetry} />
        </Box>
      );
    }
    return organizations.map((i) => (
      <Fragment key={i.ID}>
        <Divider />
        <OrganizationListItem Organization={i} />
      </Fragment>
    ));
  };

  return (
    <PageWrapper md={6} lg={4}>
      <MainCard>
        <List
          subheader={
            <Box
              sx={{
                padding: '8px 16px 8px 16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Typography variant="h5" fontWeight="bold">
                {'Şirketlerim'}
              </Typography>
            </Box>
          }>
          {getContent(organizations, isLoading)}
        </List>
      </MainCard>
    </PageWrapper>
  );
};

export default OrganizationList;
