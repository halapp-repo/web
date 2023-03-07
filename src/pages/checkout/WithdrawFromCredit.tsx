import { Grid, Box, Typography, Stack, Alert } from '@mui/material';
import { useContext, useEffect } from 'react';
import { OrganizationsContext } from './OrganizationsContext';
import { useTheme } from '@mui/system';
import { ShoppingCartContext } from './ShoppingCartContext';

interface WithdrawFromBalanceProps {
  OrganizationId?: string;
  SetHasEnoughCredit: (value: boolean) => void;
}

const WithdrawFromCredit = ({ OrganizationId, SetHasEnoughCredit }: WithdrawFromBalanceProps) => {
  const theme = useTheme();
  const organizations = useContext(OrganizationsContext);
  const shoppingCart = useContext(ShoppingCartContext);
  const selectedOrganization = organizations?.find((o) => o.ID === OrganizationId);

  useEffect(() => {
    if (selectedOrganization && shoppingCart) {
      SetHasEnoughCredit(
        selectedOrganization.Balance + selectedOrganization.CreditLimit - shoppingCart.Total >= 0
      );
    }
  }, [selectedOrganization, shoppingCart]);

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
                <Typography variant="h5">{selectedOrganization.Name}</Typography>
              </Grid>
            </Grid>
            <Stack spacing={1}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    {'Kullanılabilir kredi'}
                  </Typography>
                  <Typography variant="h4" color={theme.palette.info.main}>
                    {selectedOrganization.getAvailableCreditAmount()}
                  </Typography>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    {'Bakiye'}
                  </Typography>
                  <Typography
                    variant="h4"
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
                    Sipariş miktarı
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {shoppingCart.TotalAmount}
                  </Typography>
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
