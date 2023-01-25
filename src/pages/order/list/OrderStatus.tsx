import { Order } from '../../../models/order';
import { Box, Stack, Typography } from '@mui/material';
import { FieldTimeOutlined } from '@ant-design/icons';
import { translateOrderStatus } from '../../../utils/english-turkish-translator';
import { OrderStatus as Status } from '../../../models/order-status';
import { red, grey, yellow } from '@mui/material/colors';

interface OrderStatusProps {
  Order: Order;
}

const getColor = (status: Status): string => {
  if (status === Status.Created) {
    return yellow['800'];
  } else if (status === Status.Canceled) {
    return red['500'];
  } else {
    return grey['900'];
  }
};

const OrderStatus = ({ Order }: OrderStatusProps) => {
  return (
    <Stack direction={'row'} justifyContent="flex-start" alignItems={'center'} spacing={1}>
      <FieldTimeOutlined />
      <Box>
        <Typography variant="body1" color="secondary">
          {'Sipariş Durumu'}
        </Typography>
        <Typography variant="body1" color={getColor(Order.Status)}>{`${translateOrderStatus(
          Order.Status
        )}`}</Typography>
      </Box>
    </Stack>
  );
};

export { OrderStatus };
