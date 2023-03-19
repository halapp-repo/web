import { Box, Divider, List } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import ShoppingCartListItem from './SCListItem';
import ShoppingCartItemCounter from './SCItemCounter';
import SummaryNCheckout from './SummaryNCheckout';
import { useEffect, Fragment } from 'react';
import {
  fetchTodaysPrices,
  selectPriceIsLoading,
  selectPricesOfToday
} from '../../store/prices/pricesSlice';
import { ProductType } from '@halapp/common';
import ShoppingCartEmptyListContent from './SCEmptyListContent';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import SummaryIsLoading from './SummaryIsLoading';
import { Price } from '../../models/price';
import SummaryError from './SummaryError';

const ShoppingCartContent = () => {
  const shoppingCart = useAppSelector(selectEnhancedShoppingCart);
  const todaysPrices = useAppSelector(selectPricesOfToday);
  const selectedCity = useAppSelector(selectSelectedCity);
  const priceIsLoading = useAppSelector(selectPriceIsLoading);
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

  const getSummary = (prices: Price[] | null | undefined, isLoading: boolean) => {
    if (typeof prices === 'undefined' || isLoading) {
      return <SummaryIsLoading />;
    } else if (prices === null) {
      return <SummaryError />;
    }
    return <SummaryNCheckout ShoppingCart={shoppingCart} />;
  };

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
                  <Fragment key={i.ProductId}>
                    <ShoppingCartListItem key={i.ProductId} Item={i} />
                    <Divider />
                  </Fragment>
                );
              }
            })}
          </List>
        ) : (
          <ShoppingCartEmptyListContent />
        )}
      </Box>

      <Box sx={{ p: '16px' }}>{getSummary(todaysPrices, priceIsLoading)}</Box>
    </Box>
  );
};

export default ShoppingCartContent;
