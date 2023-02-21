import { Box, Typography, Stack, Grid } from '@mui/material';
import { Order } from '../../../models/order';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

interface OrderDeliveryAddressProps {
  Order: Order;
}

const OrderDeliveryAddress = ({ Order }: OrderDeliveryAddressProps) => {
  const deliveryAddress = Order.DeliveryAddress;
  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <LocalShippingOutlinedIcon color="info" />
      </Grid>
      <Grid item xs={10} sm={11}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Teslimat Adresi'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                <Typography variant="body1" fontWeight={'bold'}>
                  {deliveryAddress?.AddressLine}
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  {`${deliveryAddress?.County} ${deliveryAddress?.City} ${deliveryAddress?.ZipCode} ${deliveryAddress?.Country}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrderDeliveryAddress };
