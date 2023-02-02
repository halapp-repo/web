import { Typography, Stack } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderInvoiceProps {
  Order: Order;
}
const OrderInvoice = ({ Order }: OrderInvoiceProps) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} sx={{ margin: '30px 0px' }}>
      <Typography variant="h4">{Order.Id}</Typography>
    </Stack>
  );
};

export { OrderInvoice };
