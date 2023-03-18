import { Stack, Typography, Box } from '@mui/material';
import moment from 'moment';
import { ExtraChargeType, ExtraCharge } from '@halapp/common';

interface SummaryDeliveryProps {
  ExtraCharges?: ExtraCharge[];
  DeliveryTime: moment.Moment;
}

const SummaryDelivery = ({ ExtraCharges, DeliveryTime }: SummaryDeliveryProps) => {
  const deliveryCharge = ExtraCharges?.find(
    (e) => e.Type === ExtraChargeType.lowPriceDeliveryCharge
  );
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Teslimat özeti'}
      </Typography>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="body2">{`Taşıma ve nakliye:`}</Typography>
        <Typography variant="body2" fontWeight={'bold'}>
          {deliveryCharge
            ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                deliveryCharge.Price
              )
            : 'Ücretsiz'}
        </Typography>
      </Stack>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="body2">{`Teslimat zamanı:`}</Typography>
        <Typography variant="body2" fontWeight={'bold'}>
          {`${DeliveryTime.format('DD MMM (HH:mm')}-${DeliveryTime.clone()
            .add(1, 'h')
            .format('HH:mm)')}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export { SummaryDelivery };
