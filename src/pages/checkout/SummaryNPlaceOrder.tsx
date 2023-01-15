import { Stack, Box, Button, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { City } from '../../models/city';
import { OrderItemDTO } from '../../models/dtos/order.dto';
import { ProductType } from '../../models/product-type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodaysPrices } from '../../store/prices/pricesSlice';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { toggleShoppingCart } from '../../store/ui/uiSlice';

interface SummaryNPlaceOrderProps {
  IsValid: boolean;
  SetOrderItems: (orderItems: OrderItemDTO[]) => Promise<void>;
}

const SummaryNPlaceOrder = ({ IsValid, SetOrderItems }: SummaryNPlaceOrderProps) => {
  const dispatch = useAppDispatch();
  const ShoppingCart = useAppSelector(selectEnhancedShoppingCart);

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

    return () => {
      clearTimeout(timer);
      dispatch(toggleShoppingCart(false));
    };
  }, []);

  useEffect(() => {
    if (ShoppingCart) {
      SetOrderItems(
        ShoppingCart.Items.map(
          (i) =>
            ({
              Count: i.Count,
              Price: i.Price!,
              ProductId: i.ProductId,
              Unit: i.Unit!
            } as OrderItemDTO)
        )
      );
    }
  }, [ShoppingCart]);

  return (
    <Stack spacing={1}>
      <Box>
        <Button
          type="submit"
          variant="contained"
          disabled={IsValid}
          sx={{ width: '100%', fontWeight: 'bold' }}>
          {'Ürünleri gönder'}
        </Button>
        <Typography variant="body2" color="secondary">
          {"By placing your order, you agree to HalApp's privacy notice and condition of use"}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
          {'Teslimat özeti'}
        </Typography>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Ürünler (${ShoppingCart.Items.length}):`}</Typography>
          <Typography variant="body2">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Taşıma ve nakliye:`}</Typography>
          <Typography variant="body2">{`₺0`}</Typography>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="h4" color="primary">{`Toplam ücret:`}</Typography>
          <Typography variant="h4" color="primary">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export { SummaryNPlaceOrder };