import { useEffect, useState } from 'react';
import { Box, Divider, List, Grid } from '@mui/material';
import MainCard from '../../components/MainCard';
import { AddressSelector } from './AddressSelector';
import {
  fetchOrganizations,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PaymentMethod } from './PaymentMethod';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { fetchTodaysPrices } from '../../store/prices/pricesSlice';
import { SummaryNPlaceOrder } from './SummaryNPlaceOrder';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { Comment } from './Comment';
import { toggleShoppingCart } from '../../store/ui/uiSlice';
import { DeliveryTime } from './DeliveryTime';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(selectOrganizations);
  const shoppingCart = useAppSelector(selectEnhancedShoppingCart);
  useEffect(() => {
    dispatch(
      fetchTodaysPrices({
        location: City.istanbul,
        type: ProductType.produce
      })
    );
    const timer = setInterval(() => {
      dispatch(fetchTodaysPrices({ location: City.istanbul, type: ProductType.produce }));
    }, 300000);
    if (!organizations?.List) {
      dispatch(fetchOrganizations());
    }
    return () => {
      clearTimeout(timer);
      dispatch(toggleShoppingCart(false));
    };
  }, []);
  return (
    <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
      <Grid item xs={12} sm={12} md={6}>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            {organizations?.List && <AddressSelector Organizations={organizations?.List} />}
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <PaymentMethod />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <DeliveryTime />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <Comment />
          </MainCard>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <MainCard sx={{ mt: 2, p: 2 }}>
          <SummaryNPlaceOrder ShoppingCart={shoppingCart} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Checkout;
