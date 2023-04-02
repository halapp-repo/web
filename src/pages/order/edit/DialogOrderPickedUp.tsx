import { OrderStatusType } from '@halapp/common';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

import { Order } from '../../../models/order';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { updateOrderStatus } from '../../../store/orders/ordersSlice';

interface DialogOrderPickedUpProps {
  Order: Order;
  Organization: Organization;
  HandleClose: () => void;
  Open: boolean;
}

const DialogOrderPickedUp = ({
  Order,
  Organization,
  HandleClose,
  Open
}: DialogOrderPickedUpProps) => {
  const dispatch = useAppDispatch();

  const handleOrderPickedUp = (orderId: string) => {
    dispatch(
      updateOrderStatus({
        OrderId: orderId,
        Status: OrderStatusType.PickedUp,
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
          {'Sipariş Hazırlandı Mi ?'}
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
                    {'Sipariş'}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <List>
                    {Order.Items.map((o) => (
                      <ListItemText
                        key={o.ProductId}
                        primary={o.ProductName}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{ component: 'div' }}
                        secondary={
                          <Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                              <Stack direction={'row'} spacing={1}>
                                <Typography variant="body2">
                                  {new Intl.NumberFormat('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                  }).format(o.Price)}
                                </Typography>
                                <Typography variant="body2">{'x'}</Typography>
                                <Typography variant="body2" fontWeight={'bold'}>
                                  {`(${o.Count})${o.Unit}`}
                                </Typography>
                              </Stack>
                              <Typography variant="body2" color="info.main">
                                <strong>
                                  {new Intl.NumberFormat('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                  }).format(o.TotalPrice)}
                                </strong>
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    ))}
                  </List>
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
            handleOrderPickedUp(Order.Id);
            HandleClose();
          }}
          color={'admin'}>
          {'Evet, Sipariş Hazırlandı'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogOrderPickedUp };
