import { ShopOutlined } from '@ant-design/icons';
import { Box, Stack, Typography } from '@mui/material';

import { Order } from '../../../models/order';

interface OrderAddressProps {
  Order: Order;
}

const OrderAddress = ({ Order }: OrderAddressProps) => {
  return (
    <Stack direction={'row'} justifyContent="flex-start" alignItems={'center'} spacing={1}>
      <ShopOutlined />
      <Box>
        <Typography variant="body1" color="secondary">
          {'Teslimat Adresi'}
        </Typography>
        <Typography variant="body2">
          {`${Order.DeliveryAddress.AddressLine} ${Order.DeliveryAddress.County} ${Order.DeliveryAddress.City} ${Order.DeliveryAddress.ZipCode} ${Order.DeliveryAddress.Country}`}
        </Typography>
      </Box>
    </Stack>
  );
};

export { OrderAddress };
