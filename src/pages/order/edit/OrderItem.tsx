import { Stack, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { OrderItem as Item } from '../../../models/order';

interface OrderItemProps {
  Item: Item;
}

const OrderItem = ({ Item }: OrderItemProps) => {
  return (
    <ListItem key={Item.ProductId} alignItems="flex-start">
      <ListItemText
        primary={Item.ProductName}
        primaryTypographyProps={{ fontWeight: 'bold' }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="body2">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                    Item.Price
                  )}
                </Typography>
                <Typography variant="body2">{'x'}</Typography>
                <Typography variant="body2" fontWeight={'bold'}>
                  {Item.Count}
                </Typography>
              </Stack>
              <Typography variant="body2">
                <strong>
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                    Item.totalPrice()
                  )}
                </strong>
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export { OrderItem };
