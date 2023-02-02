import { Typography, Stack } from '@mui/material';
import { Order } from '../../../models/order';
import { StatusChip } from '../StatusChip';

interface OrderStatusProps {
  Order: Order;
}

const OrderStatus = ({ Order }: OrderStatusProps) => {
  return (
    <Stack spacing={1} direction="row" alignContent={'center'} alignItems="center">
      <Typography
        variant="body1"
        fontWeight={'bold'}
        color="secondary"
        sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '20%' }}>
        {'Sipariş Durumu'}
      </Typography>
      <StatusChip Order={Order} />
    </Stack>
  );
};

export { OrderStatus };
