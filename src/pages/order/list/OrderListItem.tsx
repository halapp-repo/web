import { Stack, Grid } from '@mui/material';
import { Order } from '../../../models/order';
import { OrderStatus } from './OrderStatus';
import { OrderCalendar } from './OrderCalendar';
import { OrderTotalPrice } from './OrderTotalPrice';

interface OrderListItemProps {
  Order: Order;
}

const OrderListItem = ({ Order }: OrderListItemProps) => {
  return (
    <Grid container rowSpacing={1} justifyContent="right" columnSpacing={1} alignItems="right">
      <Grid item xs={4}>
        <OrderCalendar Order={Order} />
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={1}>
          <OrderTotalPrice Order={Order} />
          <OrderStatus Order={Order} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrderListItem;
