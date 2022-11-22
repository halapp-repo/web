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
      dispatch(fetchOrganizations());
    }
  }, [userAuth]);

  return (
    <Box>
      <PageWrapper>
        <MainCard
          sx={{
            minWidth: { xs: '100%' },
            maxWidth: { xs: '100%' },
            // minHeight: { xs: '100vh', sm: 'inherit' },
            margin: { xs: 0, sm: 1, md: 3 },
            '& > *': {
              flexGrow: 1,
              flexBasis: '50%'
            }
          }}>
          <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>
            <Stack spacing={2}>
              {organizations?.map((o) => (
                <OrganizationListItem key={o.ID} organization={o} />
              ))}
            </Stack>
          </Box>
        </MainCard>
      </PageWrapper>
    </Box>
  );
};

export default OrganizationList;
