import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Typography, Grid, Stack } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderDatesProps {
  Order: Order;
}

const OrderDates = ({ Order }: OrderDatesProps) => {
  const deliveryTime = Order.DeliveryTime.clone();
  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <AccessTimeOutlinedIcon color="info" />
      </Grid>
      <Grid item xs={10} sm={11}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Sipariş Tarihi'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                {Order.CreatedDate.format('MMM DD,YYYY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Teslimat Tarihi'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">{`${deliveryTime.format(
                'MMM DD,YYYY (HH:mm'
              )} - ${deliveryTime.clone().add(1, 'h').format('HH:mm)')}`}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrderDates };
