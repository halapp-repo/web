import { OrderStatusType } from '@halapp/common';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Order, OrderItem } from '../../../models/order';
import { useAppDispatch } from '../../../store/hooks';
import { updateOrderStatus } from '../../../store/orders/ordersSlice';
import { green } from '@mui/material/colors';

interface DialogSaveItemsProps {
  HandleClose: () => void;
  Open: boolean;
  Order: Order;
  NewItems: OrderItem[];
}

const DialogSaveItems = ({ Order, NewItems, HandleClose, Open }: DialogSaveItemsProps) => {
  const dispatch = useAppDispatch();

  const handleOrderDelivered = (orderId: string) => {
    dispatch(updateOrderStatus({ OrderId: orderId, Status: OrderStatusType.Delivered }));
  };

  const insertedItems = NewItems.filter(
    (x) => !Order.Items.map((i) => i.ProductId).includes(x.ProductId)
  );
  const deletedItems = Order.Items.filter(
    (x) => !NewItems.map((i) => i.ProductId).includes(x.ProductId)
  );

  return (
    <Dialog onClose={HandleClose} open={Open} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant="h5" color={'#8753de'}>
          {'Ürünleri Güncellemek Istiyor Musun ?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: 'center'
          }}>
          {/* Deleted */}
          {deletedItems && deletedItems.length > 0 && (
            <>
              <Typography variant="h5" color="error">
                {'Silinen Ürünler'}
              </Typography>
              {deletedItems.map((item) => (
                <Box sx={{ width: '100%' }} key={item.ProductId}>
                  <Typography color="primary">{item.ProductName}</Typography>
                </Box>
              ))}
            </>
          )}
          {/* Inserted */}
          {insertedItems && insertedItems.length > 0 && (
            <>
              <Typography variant="h5" color={green['A400']}>
                {'Eklenen Ürünler'}
              </Typography>
              {insertedItems.map((item) => (
                <Box sx={{ width: '100%' }} key={item.ProductId}>
                  <Typography color="primary">{item.ProductName}</Typography>
                </Box>
              ))}
            </>
          )}
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
          {'Evet, Ürünleri Güncelle'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogSaveItems };
