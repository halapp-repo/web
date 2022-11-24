import { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  fetchOrganizations,
  selectOrganizations
} from '../../../store/organizations/organizationsSlice';
import PageWrapper from '../../../components/PageWrapper';
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
      dispatch(fetchOrganizations());
    }
  }, [userAuth]);

  return (
    <Box>
      <PageWrapper md={6}>
        <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>
          <Stack spacing={2}>
            {organizations?.map((o) => (
              <OrganizationListItem key={o.ID} organization={o} />
            ))}
          </Stack>
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default OrganizationList;
