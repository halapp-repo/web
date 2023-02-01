import { Stack, Box, List, Divider, Typography } from '@mui/material';
import { Order } from '../../../models/order';
import { OrderItem as OrderListItem } from './OrderItem';

interface OrderItemListProps {
  Order: Order;
}

const OrderItemList = ({ Order }: OrderItemListProps) => {
  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={2} sx={{ padding: '8px 16px 8px 16px', color: '#ffc423' }}>
        <Box>🧺</Box>
        <Box>{`Ürün çeşiti ${Order.Items.length}`}</Box>
      </Stack>
      <Box sx={{ flexGrow: '1', p: '2px', overflowY: 'auto' }}>
        <List>
          {Order.Items.map((i, index, arr) => {
            if (arr.length === index + 1) {
              return <OrderListItem key={i.ProductId} Item={i} />;
            } else {
              return (
                <>
                  <OrderListItem key={i.ProductId} Item={i} />
                  <Divider />
                </>
              );
            }
          })}
        </List>
      </Box>
      <Divider sx={{ marginBottom: '10px' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <Typography variant="h4">
          <strong>{'Toplam :'}</strong>
        </Typography>
        <Typography variant="h4" color="primary">
          <strong>
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
              Order.totalPrice()
            )}
          </strong>
        </Typography>
      </Box>
    </Stack>
  );
};

export { OrderItemList };
