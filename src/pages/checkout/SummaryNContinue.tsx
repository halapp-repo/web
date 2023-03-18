import { Stack, Box, Button, Typography, Divider } from '@mui/material';
import { useContext, useEffect } from 'react';
import { trMoment } from '../../utils/timezone';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from './ShoppingCartContext';
import { ExtraChargeService, OrderItemVM } from '@halapp/common';
import { SummaryOrder } from './SummaryOrder';
import { SummaryDelivery } from './SummaryDelivery';
import { SummaryTotalPrice } from './SummaryTotalPrice';

interface SummaryNPlaceOrderProps {
  IsValid: boolean;
  SetOrderItems: (orderItems: OrderItemVM[]) => Promise<void>;
  DeliveryTime: string;
}

const SummaryNContinue = ({ IsValid, SetOrderItems, DeliveryTime }: SummaryNPlaceOrderProps) => {
  const shoppingCart = useContext(ShoppingCartContext);
  const deliveryTime = trMoment(DeliveryTime).clone();
  const extraCharges = new ExtraChargeService().getExtraCharges({
    orderPrice: shoppingCart.Total,
    balance: undefined
  });

  useEffect(() => {
    if (shoppingCart) {
      SetOrderItems(
        shoppingCart.ActiveItems.map(
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
  }, [shoppingCart]);

  return (
    <Stack spacing={1}>
      <Box>
        <Button
          type="submit"
          variant="contained"
          disabled={IsValid}
          sx={{ width: '100%', fontWeight: 'bold', textTransform: 'none' }}>
          {'Kaydet ve Devam Et'}
        </Button>
        <Typography variant="body2" color="secondary">
          Kaydet ve Devam Et tuşuna tıklayarak, halapp{"'"}in{' '}
          <Link to={'/privacy#gizlilik-politikasi'}>
            <b>gizlilik politikası</b>
          </Link>{' '}
          ve{' '}
          <Link to={'/privacy#kullanim-sartlari'}>
            <b>kullanım şartlarını</b>
          </Link>{' '}
          kabul etmektesin.
        </Typography>
      </Box>
      <Divider />
      <SummaryOrder ShoppingCart={shoppingCart} />
      <Divider />
      <SummaryDelivery DeliveryTime={deliveryTime} ExtraCharges={extraCharges} />
      <Divider />
      <SummaryTotalPrice ShoppingCart={shoppingCart} ExtraCharges={extraCharges} />
    </Stack>
  );
};

export { SummaryNContinue };
