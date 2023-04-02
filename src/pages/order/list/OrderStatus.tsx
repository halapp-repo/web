import { FieldTimeOutlined } from '@ant-design/icons';
import { Box, Stack, Typography } from '@mui/material';

import { Order } from '../../../models/order';
import { StatusChip } from '../StatusChip';

interface OrderStatusProps {
  Order: Order;
}

const OrderStatus = ({ Order }: OrderStatusProps) => {
  return (
    <Stack direction={'row'} justifyContent="flex-start" alignItems={'center'} spacing={1}>
      <FieldTimeOutlined />
      <Box>
        <Typography variant="body1" color="secondary">
          {'Sipariş Durumu'}
        </Typography>
        <StatusChip Order={Order} />
      </Box>
    </Stack>
  );
};

export { OrderStatus };
