import { OrderStatusType } from '@halapp/common';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
    <Dialog
      PaperProps={{
        sx: {
          width: '375px'
        }
      }}
      sx={{ borderRadius: '8px' }}
      onClose={HandleClose}
      open={Open}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          backgroundColor: '#F0F2F2',
          padding: '0 24px',
          borderBottom: '1px solid #D5D9D9'
        }}>
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={'16px'}
          sx={{ padding: '16px 0', minHeight: '56px', lineHeight: '24px' }}>
          {'Siparişi Iptal Et ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          <b>{Order.CreatedDate.format('MMMM DD YYYY')}</b>
          <i>{`'da verilen siparişi iptal etmek istediğinizden emin misiniz?`}</i>
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
