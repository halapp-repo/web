import {
  Grid,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  Theme,
  Typography,
  Stack,
  Button,
  Alert
} from '@mui/material';
import { useContext } from 'react';
import { OrganizationsContext } from './OrganizationsContext';

interface WithdrawFromBalanceProps {
  OrganizationId?: string;
}

const WithdrawFromBalance = ({ OrganizationId }: WithdrawFromBalanceProps) => {
  const organizations = useContext(OrganizationsContext);
  const selectedOrganization = organizations?.find((o) => o.ID === OrganizationId);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ m: '20px 0px' }}>
          <Typography variant="h5" fontWeight={'bold'} color="text.secondary">
            {'Şirket Bilgileri'}
          </Typography>
        </Box>
        <Stack spacing={1}>
          {OrganizationId && selectedOrganization ? (
            <Stack spacing={1}>
              <Typography color="text.secondary" fontWeight={'bold'}>
                Kullanılabilir bakiye
              </Typography>
              <Typography color="text.secondary">
                {selectedOrganization.getRemainingBalanceAmount()}
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2} alignItems="center">
              <Alert severity="error">
                Teslimat adımında şirket seçmek zorundasınız. Lütfen teslimat adımına geri dönün.
              </Alert>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export { WithdrawFromBalance };
