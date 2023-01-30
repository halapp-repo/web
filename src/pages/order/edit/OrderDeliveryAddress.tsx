import { Box, Typography, Stack } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderDeliveryAddressProps {
  Order: Order;
}

const OrderDeliveryAddress = ({ Order }: OrderDeliveryAddressProps) => {
  const deliveryAddress = Order.DeliveryAddress;
  return (
    <Stack spacing={1}>
      <Typography variant="body1" fontWeight={'bold'} color="secondary">
        {'Teslimat Adresi'}
      </Typography>
      <Box>
        <Typography variant="body1" fontWeight={'bold'}>
          {deliveryAddress?.AddressLine}
        </Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          {`${deliveryAddress?.County} ${deliveryAddress?.City} ${deliveryAddress?.ZipCode} ${deliveryAddress?.Country}`}
        </Typography>
      </Box>
    </Stack>
  );
};

export { OrderDeliveryAddress };
