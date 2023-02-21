import { useNavigate } from 'react-router-dom';
import { List, CircularProgress, Box, TextField, Divider } from '@mui/material';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import PageWrapper from '../../../components/PageWrapper';
import MainCard from '../../../components/MainCard';
import { OrganizationListItem } from '../list/OrganizationListItem';
import {
  fetchAllOrganizations,
  selectAdminList,
  selectOrganizationIsLoading
} from '../../../store/organizations/organizationsSlice';
import { getComparator } from '../../../utils/sort';
import { contains } from '../../../utils/filter';

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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            [...(organizations || [])]
              ?.sort(getComparator('desc', 'CreatedDate'))
              .filter((p) => {
                if (!filteringOrgName) {
                  return true;
                } else {
                  return contains((p.Name || '').toLowerCase(), filteringOrgName);
                }
              })
              .map((i) => (
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

export default AdminOrganizationList;
