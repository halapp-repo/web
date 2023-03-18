import { ExtraCharge, ExtraChargeType, PaymentMethodType } from '@halapp/common';
import { Stack, Typography, Box } from '@mui/material';
import { translatePaymentMethodType } from '@halapp/common';

interface SummaryPaymentProps {
  PaymentMethodType: PaymentMethodType;
  ExtraCharges?: ExtraCharge[];
}

const SummaryPayment = ({ PaymentMethodType: PMT, ExtraCharges }: SummaryPaymentProps) => {
  const paymentCharge = ExtraCharges?.find((e) => e.Type === ExtraChargeType.usingCreditCharge);
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Ödeme özeti'}
      </Typography>
      <Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Ödeme yöntemi:`}</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {translatePaymentMethodType(PMT)}
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
