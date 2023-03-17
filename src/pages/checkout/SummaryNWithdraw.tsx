import { Stack, Button, Divider } from '@mui/material';
import { SummaryOrder } from './SummaryOrder';
import { SummaryTotalPrice } from './SummaryTotalPrice';
import { useContext } from 'react';
import { ShoppingCartContext } from './ShoppingCartContext';
import { SummaryPayment } from './SummaryPayment';
import { PaymentMethodType } from '@halapp/common';
import { OrganizationsContext } from './OrganizationsContext';

interface SummaryNWithdrawProps {
  PaymentMethodType: PaymentMethodType;
  IsDisable: boolean;
  OrganizationId: string;
}

const SummaryNWithdraw = ({
  IsDisable,
  PaymentMethodType,
  OrganizationId
}: SummaryNWithdrawProps) => {
  const shoppingCart = useContext(ShoppingCartContext);
  const organizations = useContext(OrganizationsContext);
  const selectedOrganization = organizations?.find((o) => o.ID === OrganizationId);
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
        <SummaryPayment
          PaymentMethodType={PaymentMethodType}
          ShoppingCart={shoppingCart}
          Organization={selectedOrganization}
        />
        <Divider />
        <SummaryTotalPrice ShoppingCart={shoppingCart} Organization={selectedOrganization} />
      </Stack>
    </Stack>
  );
};

export { SummaryNWithdraw };
