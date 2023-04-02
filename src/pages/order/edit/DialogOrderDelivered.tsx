import { OrderStatusType } from '@halapp/common';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';

import { Order } from '../../../models/order';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { updateOrderStatus } from '../../../store/orders/ordersSlice';

interface DialogOrderDeliveredProps {
  Order: Order;
  Organization: Organization;
  HandleClose: () => void;
  Open: boolean;
}

const DialogOrderDelivered = ({
  Order,
  Organization,
  HandleClose,
  Open
}: DialogOrderDeliveredProps) => {
  const dispatch = useAppDispatch();

  const handleOrderDelivered = (orderId: string) => {
    dispatch(
      updateOrderStatus({
        OrderId: orderId,
        Status: OrderStatusType.Delivered,
        OrganizationId: Organization.ID!
      })
    );
  };
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '375px'
        }
      }}
      sx={{ borderRadius: '8px' }}
      onClose={HandleClose}
      open={Open}
      fullWidth>
      <DialogTitle
        sx={{
          textAlign: 'center',
          backgroundColor: '#F0F2F2',
          padding: '0 24px',
          borderBottom: '1px solid #D5D9D9'
        }}>
        <Typography
          color={'#8753de'}
          variant="h4"
          fontWeight={700}
          fontSize={'16px'}
          sx={{ padding: '16px 0', minHeight: '56px', lineHeight: '24px' }}>
          {'Sipariş Teslim Edildi Mi ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h6" fontWeight={'bold'} color="info.main">
                    {'Sirket Ismi'}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" fontWeight={'bold'} color="primary">
                    {Organization.Name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h6" fontWeight={'bold'} color="info.main">
                    {'Teslimat Adresi'}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {Order.DeliveryAddress?.AddressLine}
                  </Typography>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {`${Order.DeliveryAddress?.County} ${Order.DeliveryAddress?.City} ${Order.DeliveryAddress?.ZipCode} ${Order.DeliveryAddress?.Country}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h6" fontWeight={'bold'} color="info.main">
                    {'Teslimat Zamani'}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" fontWeight={'bold'}>{`${Order.DeliveryTime.format(
                    'DD.MM.YY (HH:mm'
                  )} - ${Order.DeliveryTime.clone().add(1, 'h').format('HH:mm)')}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="outlined" onClick={HandleClose} autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleOrderDelivered(Order.Id);
            HandleClose();
          }}
          color={'admin'}>
          {'Evet, Sipariş Teslim Edildi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogOrderDelivered };
