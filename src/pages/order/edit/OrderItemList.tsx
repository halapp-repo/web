import { Stack, Box, List, Divider, Typography, Button } from '@mui/material';
import { Order, OrderItem } from '../../../models/order';
import { OrderItem as OrderListItem } from './OrderItem';
import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { DialogSaveItems } from './DialogSaveItems';
import { useEffect } from 'react';
import { Organization } from '../../../models/organization';
import { ExtraChargeListItem } from './ExtraChargeListItem';

interface OrderItemListProps {
  Order: Order;
  Organization: Organization | null;
}

const OrderItemList = ({ Order, Organization }: OrderItemListProps) => {
  const { isAdmin } = useAppSelector(selectUserAuth);
  const [items, setItems] = useState<OrderItem[]>(Order.Items);
  const [isDialogSaveItemsOpen, setIsDialogSaveItemsOpen] = useState(false);
  // functions
  const handleDeleteItem = (productId: string): void => {
    setItems(items.filter((i) => i.ProductId !== productId));
  };
  const handleRevertBack = (): void => {
    setItems(Order.Items);
  };
  const compareItems = (): boolean => {
    return (
      Array.isArray(items) &&
      Array.isArray(Order.Items) &&
      items.length === Order.Items.length &&
      items.every((i) => {
        const found = Order.Items.find((oi) => oi.ProductId === i.ProductId);
        return typeof found !== 'undefined';
      })
    );
  };
  const handleToggleDialogSaveItems = (toggle: boolean): void => {
    setIsDialogSaveItemsOpen(toggle);
  };

  useEffect(() => {
    setItems(Order.Items);
  }, [Order.Items]);

  return (
    <>
      <Stack spacing={1}>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{ padding: '8px 16px 8px 16px', color: '#ffc423' }}>
          <Box>🧺</Box>
          <Box>{`Ürün çeşidi ${Order.Items.length}`}</Box>
        </Stack>
        <Box sx={{ flexGrow: '1', p: '2px', overflowY: 'auto' }}>
          <List>
            {items.map((i, index, arr) => {
              if (arr.length === index + 1) {
                return (
                  <OrderListItem
                    key={i.ProductId}
                    Item={i}
                    CanBeDeleted={Order.canBeUpdated()}
                    OnDeleteItem={handleDeleteItem}
                  />
                );
              } else {
                return (
                  <>
                    <OrderListItem
                      key={i.ProductId}
                      Item={i}
                      CanBeDeleted={Order.canBeUpdated()}
                      OnDeleteItem={handleDeleteItem}
                    />
                    <Divider />
                  </>
                );
              }
            })}
          </List>
        </Box>
        {isAdmin && Order.canBeUpdated() && !compareItems() && (
          <Stack direction={'row'} justifyContent="space-around" spacing={1}>
            <Button fullWidth color="admin" variant="outlined" onClick={handleRevertBack}>
              {'Geri Dön'}
            </Button>
            <Button
              fullWidth
              color="admin"
              variant="contained"
              onClick={() => handleToggleDialogSaveItems(true)}>
              {'Kaydet'}
            </Button>
          </Stack>
        )}
        <Divider sx={{ marginBottom: '10px' }} />
        {Order.ExtraCharges?.map((e) => (
          <ExtraChargeListItem key={e.Type} Charge={e} />
        ))}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
          <Typography variant="h5">
            <strong>{'Toplam :'}</strong>
          </Typography>
          <Typography variant="h5" color="primary">
            <strong>
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                Order.TotalPrice
              )}
            </strong>
          </Typography>
        </Box>
      </Stack>
      {Order && Organization && (
        <DialogSaveItems
          Open={isDialogSaveItemsOpen}
          HandleClose={() => handleToggleDialogSaveItems(false)}
          Order={Order}
          NewItems={items}
          Organization={Organization}
        />
      )}
    </>
  );
};

export { OrderItemList };
