import { Stack, Box, Button, Typography, Divider } from '@mui/material';
import { useEffect } from 'react';
import { ProductType, OrderItemVM } from '@halapp/common';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodaysPrices } from '../../store/prices/pricesSlice';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { toggleShoppingCart } from '../../store/ui/uiSlice';
import { trMoment } from '../../utils/timezone';
import { Link } from 'react-router-dom';
import { selectSelectedCity } from '../../store/cities/citiesSlice';

interface SummaryNPlaceOrderProps {
  IsValid: boolean;
  SetOrderItems: (orderItems: OrderItemVM[]) => Promise<void>;
  DeliveryTime: string;
}

const SummaryNPlaceOrder = ({ IsValid, SetOrderItems, DeliveryTime }: SummaryNPlaceOrderProps) => {
  const dispatch = useAppDispatch();
  const ShoppingCart = useAppSelector(selectEnhancedShoppingCart);
  const selectedCity = useAppSelector(selectSelectedCity);
  const deliveryTime = trMoment(DeliveryTime).clone();

  useEffect(() => {
    dispatch(
      fetchTodaysPrices({
        location: selectedCity,
        type: ProductType.produce
      })
    );
    const timer = setInterval(() => {
      dispatch(fetchTodaysPrices({ location: selectedCity, type: ProductType.produce }));
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
            } as OrderItemVM)
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
          Ürünleri Gönder tuşuna tıklayarak , HalApp{"'"}in{' '}
          <Link to={'/privacy#gizlilik-politikasi'}>gizlilik politikası</Link> ve{' '}
          <Link to={'/privacy#kullanim-sartlari'}>kullanım şartlarını</Link> kabul etmektesin.
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
          <Typography variant="body2" color="primary">{`Ücretsiz`}</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Teslimat zamanı:`}</Typography>
          <Typography variant="body2" fontWeight={'bold'}>
            {`${deliveryTime.format('DD MMM (HH:mm')}-${deliveryTime
              .clone()
              .add(1, 'h')
              .format('HH:mm)')}`}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <Typography variant="body2" color="secondary">
          Ürünler, <b>{`${selectedCity}`}</b>
          {`'a göre fiyatlandirilmistir.`}
        </Typography>
        <Stack direction={'row'} justifyContent="flex-start">
          <Typography variant="body2" color="secondary">
            <b>Fiyatlara KDV dahildir.</b>
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="h4" color="primary">{`Toplam ücret:`}</Typography>
          <Typography variant="h4" color="primary">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export { SummaryNPlaceOrder };
