import { useEffect } from 'react';
import { List, CircularProgress, Box, Typography, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  fetchOrganizations,
  selectOrganizationIsLoading,
  selectOrganizations
} from '../../../store/organizations/organizationsSlice';
import PageWrapper from '../../../components/PageWrapper';
import MainCard from '../../../components/MainCard';
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
      if (!organizations?.List) {
        dispatch(fetchOrganizations());
      }
    }
  }, [userAuth]);

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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            organizations?.List?.map((i) => (
              <>
                <Divider />
                <OrganizationListItem Organization={i} key={i.ID} />
              </>
            ))
          )}
        </List>
      </MainCard>
    </PageWrapper>
  );
};

export default OrganizationList;
