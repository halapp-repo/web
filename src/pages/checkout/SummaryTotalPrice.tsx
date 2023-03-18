import { ExtraChargeType, ExtraCharge } from '@halapp/common';
import { Stack, Typography, Box } from '@mui/material';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppSelector } from '../../store/hooks';

interface SummaryTotalPriceProps {
  ShoppingCart: ShoppingCartList;
  ExtraCharges?: ExtraCharge[];
}

const SummaryTotalPrice = ({ ShoppingCart, ExtraCharges }: SummaryTotalPriceProps) => {
  const selectedCity = useAppSelector(selectSelectedCity);

  const deliveryCharge = ExtraCharges?.find(
    (e) => e.Type === ExtraChargeType.lowPriceDeliveryCharge
  );
  const paymentCharge = ExtraCharges?.find((e) => e.Type === ExtraChargeType.usingCreditCharge);
  let totalAmount = 0;
  totalAmount += ShoppingCart.Total;
  for (const charge of ExtraCharges || []) {
    totalAmount += charge.Price;
  }

  return (
    <Box>
      <Typography variant="body2" color="secondary">
        Ürünler, <b>{`${selectedCity}`}</b>
        {`'a göre fiyatlandırılmıştır.`}
      </Typography>
      <Stack direction={'row'} justifyContent="flex-start">
        <Typography variant="body2" color="secondary">
          <b>Fiyatlara KDV dahildir.</b>
        </Typography>
      </Stack>
      {deliveryCharge && (
        <Stack direction={'row'} justifyContent="flex-start">
          <Typography variant="body2" fontStyle={'italic'} color="secondary">
            {deliveryCharge.Warning}
          </Typography>
        </Stack>
      )}
      {paymentCharge && (
        <Stack direction={'row'} justifyContent="flex-start">
          <Typography variant="body2" fontStyle={'italic'} color="secondary">
            {paymentCharge.Warning}
          </Typography>
        </Stack>
      )}
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="h4" color="primary">{`Toplam ücret:`}</Typography>
        <Typography variant="h4" color="primary">{`${new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'TRY'
        }).format(totalAmount)}`}</Typography>
      </Stack>
    </Box>
  );
};

export { SummaryTotalPrice };
