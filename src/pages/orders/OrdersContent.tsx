import { Box, List, ListSubheader, ListItem, ListItemText } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { useEffect } from 'react';
import { fetchTodaysPrices, selectPricesOfToday } from '../../store/prices/pricesSlice';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { fetchOrdersByMonth } from '../../store/orders/ordersSlice';
import { Order } from '../../models/order';

interface OrdersContentProps {
  Orders: Order[] | null;
  IsLoading: boolean;
}

const OrdersContent = ({ Orders }: OrdersContentProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 0 }
        }}
        subheader={<li />}>
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
};

export default OrdersContent;
