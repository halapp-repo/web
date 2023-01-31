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
import { useAppDispatch } from '../../../store/hooks';
import { deleteOrder } from '../../../store/orders/ordersSlice';

interface DialogCancelOrderProps {
  Order: Order;
  HandleClose: () => void;
  Open: boolean;
}

const DialogCancelOrder = ({ Order, HandleClose, Open }: DialogCancelOrderProps) => {
  const dispatch = useAppDispatch();
  const handleCancelOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
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
        <Button onClick={HandleClose} autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
          onClick={() => {
            handleCancelOrder(Order.Id);
            HandleClose();
          }}
          color={'error'}>
          {'Evet, Siparişi Iptal Et'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogCancelOrder };
