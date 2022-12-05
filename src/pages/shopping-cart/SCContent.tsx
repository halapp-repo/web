import { Box, Divider, List } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import ShoppingCartListItem from './SCListItem';
import ShoppingCartItemCounter from './SCItemCounter';
import SummaryNCheckout from './SummaryNCheckout';
import { useEffect } from 'react';
import { fetchTodaysPrices, selectPricesOfToday } from '../../store/prices/pricesSlice';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import ShoppingCartEmptyListContent from './SCEmptyListContent';

const ShoppingCartContent = () => {
  const shoppingCart = useAppSelector(selectEnhancedShoppingCart);
  const todaysPrices = useAppSelector(selectPricesOfToday);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!todaysPrices) {
      dispatch(
        fetchTodaysPrices({
          location: City.istanbul,
          type: ProductType.produce
        })
      );
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <ShoppingCartItemCounter ShoppingCart={shoppingCart} />
      </Box>
      <Box sx={{ flexGrow: '1', p: '2px', overflowY: 'auto' }}>
        {shoppingCart.Items.length > 0 ? (
          <List>
            {shoppingCart.Items.map((i, index, arr) => {
              if (arr.length === index + 1) {
                return <ShoppingCartListItem key={i.ProductId} Item={i} />;
              } else {
                return (
                  <>
                    <ShoppingCartListItem key={i.ProductId} Item={i} />
                    <Divider />
                  </>
                );
              }
            })}
          </List>
        ) : (
          <ShoppingCartEmptyListContent />
        )}
      </Box>

      <Box sx={{ p: '16px' }}>
        <SummaryNCheckout ShoppingCart={shoppingCart} />
      </Box>
    </Box>
  );
};

export default ShoppingCartContent;
