import { Box, Divider, List } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import ShoppingCartListItem from './SCListItem';
import ShoppingCartItemCounter from './SCItemCounter';
import SummaryNCheckout from './SummaryNCheckout';
import { useEffect } from 'react';
import { fetchTodaysPrices, selectPricesOfToday } from '../../store/prices/pricesSlice';
import { ProductType } from '@halapp/common';
import ShoppingCartEmptyListContent from './SCEmptyListContent';
import { selectSelectedCity } from '../../store/cities/citiesSlice';

const ShoppingCartContent = () => {
  const shoppingCart = useAppSelector(selectEnhancedShoppingCart);
  const todaysPrices = useAppSelector(selectPricesOfToday);
  const selectedCity = useAppSelector(selectSelectedCity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!todaysPrices) {
      dispatch(
        fetchTodaysPrices({
          location: selectedCity,
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
