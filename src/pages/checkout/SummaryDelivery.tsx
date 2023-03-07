import { Stack, Typography, Box } from '@mui/material';
import moment from 'moment';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface SummaryDeliveryProps {
  ShoppingCart: ShoppingCartList;
  DeliveryTime: moment.Moment;
}

const SummaryDelivery = ({ ShoppingCart, DeliveryTime }: SummaryDeliveryProps) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
        {'Teslimat özeti'}
      </Typography>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="body2">{`Taşıma ve nakliye:`}</Typography>
        <Typography variant="body2" fontWeight={'bold'} color="primary">
          {ShoppingCart.Total > 0 && 'Ücretsiz'}
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
