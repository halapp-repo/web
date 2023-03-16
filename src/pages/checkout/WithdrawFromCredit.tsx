import { Grid, Box, Typography, Stack, Alert, Button, Divider } from '@mui/material';
import { useContext, useEffect } from 'react';
import { OrganizationsContext } from './OrganizationsContext';
import { useTheme } from '@mui/system';
import { ShoppingCartContext } from './ShoppingCartContext';
import { useAppDispatch } from '../../store/hooks';
import { updateOrganization as updateUIOrganization } from '../../store/ui/uiSlice';
import { useNavigate } from 'react-router-dom';
import { getExtraCharges } from '../../models/services/extra-charges.service';
import { translateExtraChargeType } from '../../utils/english-turkish-translator';

interface WithdrawFromBalanceProps {
  OrganizationId?: string;
  SetHasEnoughCredit: (value: boolean) => void;
}

const WithdrawFromCredit = ({ OrganizationId, SetHasEnoughCredit }: WithdrawFromBalanceProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const organizations = useContext(OrganizationsContext);
  const shoppingCart = useContext(ShoppingCartContext);
  const selectedOrganization = organizations?.find((o) => o.ID === OrganizationId);
  const extraCharges = getExtraCharges({
    shoppingCart: shoppingCart,
    organization: selectedOrganization
  });

  useEffect(() => {
    if (selectedOrganization && shoppingCart) {
      let totalPrice = shoppingCart.Total;
      for (const charge of extraCharges || []) {
        console.log(extraCharges);
        totalPrice += charge.Price;
      }
      SetHasEnoughCredit(
        selectedOrganization.Balance + selectedOrganization.CreditLimit - totalPrice >= 0
      );
    }
  }, [selectedOrganization, shoppingCart]);

  const handleDepositBalance = () => {
    dispatch(updateUIOrganization({ tab: 3 }));
    navigate(`/organization/${selectedOrganization?.ID}`);
  };

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

                    <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                      {'Kullanılabilir kredi'}
                    </Typography>
                    <Typography variant="h4" color={theme.palette.info.main}>
                      {selectedOrganization.getAvailableCreditAmount()}
                    </Typography>
                  </Typography>
                  <Divider sx={{ m: '10px 0px', width: '80%' }} />
                  <Button
                    variant="outlined"
                    color="blackNWhite"
                    size="small"
                    onClick={handleDepositBalance}>
                    Bakiye ekle
                  </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    Sipariş miktarı
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {shoppingCart.TotalAmount}
                  </Typography>
                  {extraCharges.map((e) => (
                    <>
                      <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                        {translateExtraChargeType(e.Type)}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight={'bold'}>
                        {`${new Intl.NumberFormat('tr-TR', {
                          style: 'currency',
                          currency: 'TRY'
                        }).format(e.Price)}`}
                      </Typography>
                    </>
                  ))}
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
