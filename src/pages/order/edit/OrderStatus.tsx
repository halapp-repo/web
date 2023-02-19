import { Typography, Stack, Grid } from '@mui/material';
import { Order } from '../../../models/order';
import { StatusChip } from '../StatusChip';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';

interface OrderStatusProps {
  Order: Order;
}

const OrderStatus = ({ Order }: OrderStatusProps) => {
  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <UpdateOutlinedIcon />
      </Grid>
      <Grid item xs={10} sm={11}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Sipariş Durumu'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StatusChip Order={Order} />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrderStatus };
