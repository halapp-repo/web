import { Box, CircularProgress, Divider, List, TextField } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import { RetryOnError } from '../../../components/RetryOnError';
import { Organization } from '../../../models/organization';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchAllOrganizations,
  selectAdminList,
  selectOrganizationIsLoading
} from '../../../store/organizations/organizationsSlice';
import { contains } from '../../../utils/filter';
import { getComparator } from '../../../utils/sort';
import { OrganizationListItem } from '../list/OrganizationListItem';

const AdminOrganizationList = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const organizations = useAppSelector(selectAdminList);
  const isLoading = useAppSelector(selectOrganizationIsLoading);
  const dispatch = useAppDispatch();
  const [filteringOrgName, setFilteringOrgName] = useState<string>('');

  useEffect(() => {
    if (!userAuth.isAdmin) {
      navigate('/dashboard');
    }
  }, [userAuth]);

  useEffect(() => {
    if (typeof organizations === 'undefined') {
      dispatch(fetchAllOrganizations());
    }
  }, [organizations]);

  const handleRetry = () => {
    dispatch(fetchAllOrganizations());
  };

  const getContent = (organizations: Organization[] | undefined | null, isLoading: boolean) => {
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
    return [...(organizations || [])]
      ?.sort(getComparator('desc', 'CreatedDate'))
      .filter((p) => {
        if (!filteringOrgName) {
          return true;
        } else {
          return contains((p.Name || '').toLowerCase(), filteringOrgName);
        }
      })
      .map((i) => (
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
                color: '#ffc423',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TextField
                fullWidth
                value={filteringOrgName}
                label="organization name"
                onChange={(e) => {
                  setFilteringOrgName(e.target.value);
                }}
              />
            </Box>
          }>
          {getContent(organizations, isLoading)}
        </List>
      </MainCard>
    </PageWrapper>
  );
};

export default AdminOrganizationList;
