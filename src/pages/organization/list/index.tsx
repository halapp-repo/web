import { useEffect } from 'react';
import { List, CircularProgress, Box, Typography, Divider, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllOrganizations,
  fetchOrganizations,
  selectOrganizations
} from '../../../store/organizations/organizationsSlice';
import PageWrapper from '../../../components/PageWrapper';
import MainCard from '../../../components/MainCard';
import { OrganizationListItem } from './OrganizationListItem';

const OrganizationList = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const organizations = useAppSelector(selectOrganizations);
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

  const handleFetchAllOrganizations = () => {
    dispatch(fetchAllOrganizations());
  };

  return (
    <PageWrapper md={6} lg={4}>
      <MainCard>
        <List
          subheader={
            <Box
              sx={{
                padding: '8px 16px 8px 16px',
                color: '#ffc423',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
              {userAuth.isAdmin ? (
                <Button
                  variant="contained"
                  size="small"
                  color="admin"
                  onClick={handleFetchAllOrganizations}>
                  {'Fetch all organizations'}
                </Button>
              ) : (
                <Typography>{'🏪 Sirketlerim'}</Typography>
              )}
            </Box>
          }>
          {organizations?.IsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          {organizations?.IsLoading ||
            organizations?.List?.map((i) => (
              <>
                <Divider />
                <OrganizationListItem Organization={i} key={i.ID} />
              </>
            ))}
        </List>
      </MainCard>
    </PageWrapper>
  );
};

export default OrganizationList;
