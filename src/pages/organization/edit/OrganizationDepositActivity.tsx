import { PlusSquareOutlined } from '@ant-design/icons';
import {
  AccountEventType,
  OrganizationDepositV1PayloadVM,
  PaymentMethodType
} from '@halapp/common';
import { translatePaymentMethodType } from '@halapp/common';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AccountEvent } from '../../../models/events/account-event';

interface OrganizationDepositActivityProps {
  Event: AccountEvent;
}
const OrganizationDepositActivity = ({ Event }: OrganizationDepositActivityProps) => {
  let paymentMethodType: PaymentMethodType | undefined;
  let orderId: string | undefined;
  if (Event.EventType === AccountEventType.OrganizationDepositedToBalanceV1) {
    const { PaymentMethodType, OrderId } = Event.Payload as OrganizationDepositV1PayloadVM;
    paymentMethodType = PaymentMethodType;
    orderId = OrderId;
  }
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <PlusSquareOutlined style={{ fontSize: '30px' }} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Typography variant="h5">{'Bakiyeye eklendi'}</Typography>
        {paymentMethodType && (
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" fontWeight="bold" color="secondary">
                {'Ödeme'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="body2" fontWeight="bold" color="info.main">
                {translatePaymentMethodType(paymentMethodType)}
              </Typography>
            </Grid>
          </Grid>
        )}
        {orderId && (
          <Grid container>
            <Grid item xs={12}>
              <Button
                size="small"
                variant="outlined"
                color="blackNWhite"
                component={Link}
                to={`/orders/${orderId}`}>
                {'Sipariş'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export { OrganizationDepositActivity };
