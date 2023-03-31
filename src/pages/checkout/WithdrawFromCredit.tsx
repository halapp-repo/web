import { Grid, Box, Typography, Stack, Alert, Button, Divider } from '@mui/material';
import { useContext, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/system';
import { ShoppingCartContext } from './ShoppingCartContext';
import { useAppDispatch } from '../../store/hooks';
import { updateOrganization as updateUIOrganization } from '../../store/ui/uiSlice';
import { useNavigate } from 'react-router-dom';
import { ExtraChargeService, translateExtraChargeType } from '@halapp/common';
import { Organization } from '../../models/organization';

interface WithdrawFromBalanceProps {
  Organization: Organization;
  SetHasEnoughCredit: (value: boolean) => void;
}

const WithdrawFromCredit = ({ Organization, SetHasEnoughCredit }: WithdrawFromBalanceProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shoppingCart = useContext(ShoppingCartContext);
  const extraCharges = new ExtraChargeService().getExtraCharges({
    orderPrice: shoppingCart.Total,
    balance: Organization.Balance
  });

  useEffect(() => {
    if (Organization && shoppingCart) {
      let totalPrice = shoppingCart.Total;
      for (const charge of extraCharges || []) {
        totalPrice += charge.Price;
      }
      SetHasEnoughCredit(Organization.Balance + Organization.CreditLimit - totalPrice >= 0);
    }
  }, [Organization, shoppingCart]);

  const handleDepositBalance = () => {
    dispatch(updateUIOrganization({ tab: 3 }));
    navigate(`/organization/${Organization.ID}`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ m: '20px 0px' }}>
          <Typography variant="h5" fontWeight={'bold'} color="text.secondary">
            {'Şirket Bilgileri'}
          </Typography>
        </Box>
        {Organization ? (
          <Stack spacing={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                  Şirket
                </Typography>
                <Typography variant="h5">{Organization.Name}</Typography>
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
                      Organization.Balance >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }>
                    {Organization.getBalanceAmount()}
                  </Typography>
                  <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                    {'Kullanılabilir kredi'}
                  </Typography>
                  <Typography variant="h4" color={theme.palette.info.main}>
                    {Organization.getAvailableCreditAmount()}
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
                    <Fragment key={e.Type}>
                      <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                        {translateExtraChargeType(e.Type)}
                      </Typography>
                      <Typography variant="h4" color="primary" fontWeight={'bold'}>
                        {`${new Intl.NumberFormat('tr-TR', {
                          style: 'currency',
                          currency: 'TRY'
                        }).format(e.Price)}`}
                      </Typography>
                    </Fragment>
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
