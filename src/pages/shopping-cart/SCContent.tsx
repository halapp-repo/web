import { ProductType } from '@halapp/common';
import { Box, Divider, List } from '@mui/material';
import { Fragment, useEffect } from 'react';

import { Price } from '../../models/price';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTodaysPrices,
  selectPriceIsLoading,
  selectPricesOfToday
} from '../../store/prices/pricesSlice';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import ShoppingCartEmptyListContent from './SCEmptyListContent';
import ShoppingCartItemCounter from './SCItemCounter';
import ShoppingCartListItem from './SCListItem';
import SummaryError from './SummaryError';
import SummaryIsLoading from './SummaryIsLoading';
import SummaryNCheckout from './SummaryNCheckout';

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
