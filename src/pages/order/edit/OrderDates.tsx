import { Typography, Stack, Grid } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderDatesProps {
  Order: Order;
}

const OrderDates = ({ Order }: OrderDatesProps) => {
  const deliveryTime = Order.DeliveryTime.clone();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography variant="body1" fontWeight={'bold'} color="secondary">
            {'Sipariş Tarihi'}
          </Typography>
          <Typography variant="body1">{Order.CreatedDate.format('DD.MM.YY HH:mm')}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography variant="body1" fontWeight={'bold'} color="secondary">
            {'Teslimat Tarihi'}
          </Typography>
          <Typography variant="body1">{`${deliveryTime.format('DD.MM.YY (HH:mm')} - ${deliveryTime
            .clone()
            .add(1, 'h')
            .format('HH:mm)')}`}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrderDates };