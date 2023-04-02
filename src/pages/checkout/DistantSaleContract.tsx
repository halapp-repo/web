import '../../themes/styles/scrollbar.css';

import { DistantSaleContractContent, ExtraCharge, translateExtraChargeType } from '@halapp/common';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { Organization } from '../../models/organization';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { trMoment } from '../../utils/timezone';

interface DistantSaleContractProps {
  ShoppingCart: ShoppingCartList;
  Organization: Organization;
  ExtraCharges?: ExtraCharge[];
}
const DistantSaleContract = ({
  ShoppingCart,
  Organization,
  ExtraCharges
}: DistantSaleContractProps) => {
  const deliveryAddress = Organization.getDeliveryAddress();
  const invoiceAddress = Organization.InvoiceAddress;
  const organizationAddress = Organization.CompanyAddress;
  const deliveryAddressStr = `${deliveryAddress?.AddressLine} ${deliveryAddress?.County} ${deliveryAddress?.City} ${deliveryAddress?.ZipCode} ${deliveryAddress?.Country}`;
  const invoiceAddressStr = `${invoiceAddress?.AddressLine} ${invoiceAddress?.County} ${invoiceAddress?.City} ${invoiceAddress?.ZipCode} ${invoiceAddress?.Country}`;
  const organizationAddressStr = `${organizationAddress?.AddressLine} ${organizationAddress?.County} ${organizationAddress?.City} ${organizationAddress?.ZipCode} ${organizationAddress?.Country}`;
  let totalPrice = 0;
  for (const item of ShoppingCart.Items) {
    totalPrice += item.Count * (item.Price || 0);
  }
  for (const charge of ExtraCharges || []) {
    totalPrice += charge.Price;
  }
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        <b>Mesafeli Satış Sözleşmesi</b>
      </Typography>
      <Card elevation={0}>
        <CardContent
          className="scrollbar"
          sx={{
            padding: '20px',
            height: '200px',
            backgroundColor: '#fafafa'
          }}>
          <DistantSaleContractContent
            deliveryAddress={deliveryAddressStr}
            invoiceAddress={invoiceAddressStr}
            items={[
              ...ShoppingCart.Items.map((i) => ({
                Count: i.Count,
                Name: i.Name,
                Price: i.Price || 0,
                Unit: i.Unit
              })),
              ...(ExtraCharges || []).map((e) => ({
                Count: 1,
                Name: translateExtraChargeType(e.Type),
                Price: e.Price,
                Unit: '-'
              }))
            ]}
            orderCreatedDate={trMoment().format('DD/MM/YYYY')}
            organizationAddress={organizationAddressStr}
            organizationEmail={Organization.Email || '-'}
            organizationName={Organization.Name || '-'}
            organizationPhone={Organization.PhoneNumber || '-'}
            todaysDate={trMoment().format('DD/MM/YYYY')}
            totalPrice={totalPrice}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export { DistantSaleContract };
