import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  Divider
} from '@mui/material';
import { Order } from '../../../models/order';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { deleteOrder } from '../../../store/orders/ordersSlice';

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
    // dispatch(deleteOrder(orderId));
  };
  return (
    <Dialog onClose={HandleClose} open={Open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant="h5" color={'#8753de'}>
          {'Sipariş Teslim Edildi Mi ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          <Stack direction={'row'} justifyContent="space-between">
            <Typography variant="h6" fontWeight={'bold'} color="primary">
              {'Sirket Ismi'}
            </Typography>
            <Typography variant="h6" fontWeight={'bold'}>
              {Organization.Name}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction={'row'} justifyContent="space-between">
            <Typography variant="h6" fontWeight={'bold'} color="primary">
              {'Teslimat Adresi'}
            </Typography>
            <Box>
              <Typography variant="body1" fontWeight={'bold'}>
                {Order.DeliveryAddress?.AddressLine}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'}>
                {`${Order.DeliveryAddress?.County} ${Order.DeliveryAddress?.City} ${Order.DeliveryAddress?.ZipCode} ${Order.DeliveryAddress?.Country}`}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack direction={'row'} justifyContent="space-between">
            <Typography variant="h6" fontWeight={'bold'} color="primary">
              {'Teslimat Zamani'}
            </Typography>
            <Typography variant="h6" fontWeight={'bold'}>{`${Order.DeliveryTime.format(
              'DD.MM.YY (HH:mm'
            )} - ${Order.DeliveryTime.clone().add(1, 'h').format('HH:mm)')}`}</Typography>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={HandleClose} autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
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
