import { Divider, Stack } from '@mui/material';

import { Order } from '../../../models/order';
import { Organization } from '../../../models/organization';
import { OrderDates } from './OrderDates';
import { OrderDeliveryAddress } from './OrderDeliveryAddress';
import { OrderInvoice } from './OrderInvoice';
import { OrderNote } from './OrderNote';
import { OrderStatus } from './OrderStatus';
import { OrganizationInfo } from './OrganizationInfo';

interface OrderInfoProps {
  Order: Order;
  Organization: Organization;
}

const OrderInfo = ({ Order, Organization }: OrderInfoProps) => {
  return (
    <Stack spacing={1}>
      {!Order.Id && (
        <>
          <OrderInvoice Order={Order} />
          <Divider />
        </>
      )}
      <OrderDates Order={Order} />
      <Divider />
      {Order.Note && (
        <>
          <OrderNote Order={Order} />
          <Divider />
        </>
      )}
      <OrderDeliveryAddress Order={Order} />
      <Divider />
      <OrganizationInfo Organization={Organization} />
      <Divider />
      <OrderStatus Order={Order} />
    </Stack>
  );
};

export { OrderInfo };
