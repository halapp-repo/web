import { Stack, Button, Divider } from '@mui/material';
import { SummaryOrder } from './SummaryOrder';
import { SummaryTotalPrice } from './SummaryTotalPrice';
import { useContext } from 'react';
import { ShoppingCartContext } from './ShoppingCartContext';
import { SummaryPayment } from './SummaryPayment';
import { PaymentMethodType } from '@halapp/common';

interface SummaryNWithdrawProps {
  PaymentMethodType: PaymentMethodType;
  IsDisable: boolean;
}

const SummaryNWithdraw = ({ IsDisable, PaymentMethodType }: SummaryNWithdrawProps) => {
  const shoppingCart = useContext(ShoppingCartContext);
  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={IsDisable}
          sx={{ width: '100%', fontWeight: 'bold', textTransform: 'none' }}>
          {'Siparişi Oluştur'}
        </Button>
        <Divider />
        <SummaryOrder ShoppingCart={shoppingCart} />
        <Divider />
        <SummaryPayment PaymentMethodType={PaymentMethodType} />
        <Divider />
        <SummaryTotalPrice ShoppingCart={shoppingCart} />
      </Stack>
    </Stack>
  );
};

export { SummaryNWithdraw };
