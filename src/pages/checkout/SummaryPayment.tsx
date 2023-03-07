import { PaymentMethodType } from '@halapp/common';
import { Stack, Typography, Box } from '@mui/material';
import { translatePaymentMethodType } from '../../utils/english-turkish-translator';

interface SummaryPaymentProps {
  PaymentMethodType: PaymentMethodType;
}

const SummaryPayment = ({ PaymentMethodType }: SummaryPaymentProps) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Ödeme özeti'}
      </Typography>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="body2">{`Ödeme yöntemi`}</Typography>
        <Typography variant="body2" fontWeight={'bold'}>
          {translatePaymentMethodType(PaymentMethodType)}
        </Typography>
      </Stack>
    </Box>
  );
};

export { SummaryPayment };
