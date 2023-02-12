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
import { updateOrderItems } from '../../../store/orders/ordersSlice';
import { green } from '@mui/material/colors';
import { Organization } from '../../../models/organization';

interface DialogSaveItemsProps {
  HandleClose: () => void;
  Open: boolean;
  Order: Order;
  NewItems: OrderItem[];
  Organization: Organization;
}

const DialogSaveItems = ({
  Order,
  NewItems,
  HandleClose,
  Open,
  Organization
}: DialogSaveItemsProps) => {
  const dispatch = useAppDispatch();

  const handleOrderDelivered = (orderId: string) => {
    dispatch(
      updateOrderItems({ OrderId: orderId, Items: NewItems, OrganizationId: Organization.ID! })
    );
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
        <Button onClick={HandleClose} variant="outlined" autoFocus color={'blackNWhite'}>
          {'Hayir'}
        </Button>
        <Button
          onClick={() => {
            handleOrderDelivered(Order.Id);
            HandleClose();
          }}
          variant="contained"
          color={'admin'}>
          {'Evet, Ürünleri Güncelle'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogSaveItems };
