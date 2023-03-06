import { Grid, Box, Typography, Stack, Alert } from '@mui/material';
import { useContext } from 'react';
import { OrganizationsContext } from './OrganizationsContext';
import { useTheme } from '@mui/system';

interface WithdrawFromBalanceProps {
  OrganizationId?: string;
}

const WithdrawFromCredit = ({ OrganizationId }: WithdrawFromBalanceProps) => {
  const theme = useTheme();
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

        {OrganizationId && selectedOrganization ? (
          <Stack spacing={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                  Şirket
                </Typography>
                <Typography color={theme.palette.info.main} variant="h5">
                  {selectedOrganization.Name}
                </Typography>
              </Grid>
            </Grid>
            <Stack spacing={1}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    Bakiye
                  </Typography>
                  <Typography
                    color={
                      selectedOrganization.Balance >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }>
                    {selectedOrganization.getBalanceAmount()}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    Çekilecek Miktar
                  </Typography>
                  <Typography color="text.secondary">{}</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Alert severity="error">
              Teslimat adımında şirket seçmek zorundasınız. Lütfen teslimat adımına geri dönün.
            </Alert>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export { WithdrawFromCredit };
