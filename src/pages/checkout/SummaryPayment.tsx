import { ExtraChargeType, PaymentMethodType } from '@halapp/common';
import { Stack, Typography, Box } from '@mui/material';
import { Organization } from '../../models/organization';
import { ExtraChargeService, translatePaymentMethodType } from '@halapp/common';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface SummaryPaymentProps {
  PaymentMethodType: PaymentMethodType;
  ShoppingCart: ShoppingCartList;
  Organization?: Organization;
}

const SummaryPayment = ({ PaymentMethodType, ShoppingCart, Organization }: SummaryPaymentProps) => {
  const extraCharges = new ExtraChargeService().getExtraCharges({
    orderPrice: ShoppingCart.Total,
    balance: Organization?.Balance
  });
  const paymentCharge = extraCharges.find((e) => e.Type === ExtraChargeType.usingCreditCharge);
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Ödeme özeti'}
      </Typography>
      <Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Ödeme yöntemi:`}</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {translatePaymentMethodType(PaymentMethodType)}
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`İşlem ücreti:`}</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {paymentCharge
              ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                  paymentCharge.Price
                )
              : 'Ücretsiz'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export { SummaryPayment };
