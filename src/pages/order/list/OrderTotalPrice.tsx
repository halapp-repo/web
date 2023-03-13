import { CreditCardOutlined } from '@ant-design/icons';
import { Box, Stack, Typography } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderTotalPriceProps {
  Order: Order;
}

const OrderTotalPrice = ({ Order }: OrderTotalPriceProps) => {
  return (
    <Stack direction={'row'} justifyContent="flex-start" alignItems={'center'} spacing={1}>
      <CreditCardOutlined />
      <Box>
        <Typography variant="body1" color="secondary">
          {'Toplam Ücret'}
        </Typography>
        <Typography>
          {new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
          }).format(Order.TotalPrice)}
        </Typography>
      </Box>
    </Stack>
  );
};

export { OrderTotalPrice };
