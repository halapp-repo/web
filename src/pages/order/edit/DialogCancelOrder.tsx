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

interface DialogCancelOrderProps {
  Organization: Organization;
  Order: Order;
  HandleClose: () => void;
  Open: boolean;
}

const DialogCancelOrder = ({ Order, HandleClose, Open, Organization }: DialogCancelOrderProps) => {
  const dispatch = useAppDispatch();
  const handleCancelOrder = (orderId: string) => {
    dispatch(
      updateOrderStatus({
        OrderId: orderId,
        Status: OrderStatusType.Canceled,
        OrganizationId: Organization.ID!
      })
    );
  };
  return (
    <Dialog onClose={HandleClose} open={Open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant="h5" color={'error'}>
          {'Siparişi Iptal Et ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          <b>{Order.CreatedDate.format('MMMM DD YYYY')}</b>
          <i>{`'da verilen siparisi iptal etmek istediğinizden emin misiniz?`}</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={HandleClose} variant="outlined" autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
          sx={{ color: '#ffff' }}
          onClick={() => {
            handleCancelOrder(Order.Id);
            HandleClose();
          }}
          variant="contained"
          color={'error'}>
          {'Evet, Siparişi Iptal Et'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogCancelOrder };
