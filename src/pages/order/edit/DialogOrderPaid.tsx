import { OrderStatusType } from '@halapp/common';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { Order } from '../../../models/order';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { updateOrderStatus } from '../../../store/orders/ordersSlice';

interface DialogOrderPaidProps {
  Order: Order;
  HandleClose: () => void;
  Open: boolean;
  Organization: Organization;
}

const DialogOrderPaid = ({ Order, HandleClose, Open, Organization }: DialogOrderPaidProps) => {
  const dispatch = useAppDispatch();
  const handleOrderPaid = (orderId: string) => {
    dispatch(
      updateOrderStatus({
        OrderId: orderId,
        Status: OrderStatusType.Paid,
        OrganizationId: Organization.ID!
      })
    );
  };
  return (
    <Dialog onClose={HandleClose} open={Open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant="h5" color={'#8753de'}>
          {'Sipariş Ödendi Mi ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          <b>{Organization.Name}</b>
          <i>{' tarafından '}</i>
          <b>{Order.CreatedDate.format('MMMM DD YYYY')}</b>
          <i>{`'da verilen siparis ödendi mi ?`}</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={HandleClose} variant="outlined" autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
          sx={{ color: '#ffff' }}
          onClick={() => {
            handleOrderPaid(Order.Id);
            HandleClose();
          }}
          variant="contained"
          color={'admin'}>
          {'Evet, Sipariş Ödendi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogOrderPaid };
