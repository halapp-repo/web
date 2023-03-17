import { ExtraChargeType, ExtraChargeService } from '@halapp/common';
import { Stack, Typography, Box } from '@mui/material';
import { Organization } from '../../models/organization';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppSelector } from '../../store/hooks';

interface SummaryTotalPriceProps {
  ShoppingCart: ShoppingCartList;
  Organization?: Organization;
}

const SummaryTotalPrice = ({ ShoppingCart, Organization }: SummaryTotalPriceProps) => {
  const selectedCity = useAppSelector(selectSelectedCity);
  const extraCharges = new ExtraChargeService().getExtraCharges({
    orderPrice: ShoppingCart.Total,
    balance: Organization?.Balance
  });
  const deliveryCharge = extraCharges.find(
    (e) => e.Type === ExtraChargeType.lowPriceDeliveryCharge
  );
  const paymentCharge = extraCharges.find((e) => e.Type === ExtraChargeType.usingCreditCharge);
  let totalAmount = 0;
  totalAmount += ShoppingCart.Total;
  for (const charge of extraCharges) {
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
