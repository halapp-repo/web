import { Stack, Typography } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderNoteProps {
  Order: Order;
}

const OrderNote = ({ Order }: OrderNoteProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" fontWeight={'bold'} color="secondary">
        {'Sipariş Notu'}
      </Typography>
      <Typography>{Order.Note}</Typography>
    </Stack>
  );
};

export { OrderNote };
