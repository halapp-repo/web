import CancelIcon from '@mui/icons-material/Cancel';
import { Button, List, ListItem, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';

import MainCard from '../../../components/MainCard';
import { Order } from '../../../models/order';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';

interface OrderButtonsProps {
  Order: Order;
  HandleOpenDialogCancelOrder: () => void;
  HandleOpenDialogOrderDelivered: () => void;
  HandleOpenDialogOrderPickedUp: () => void;
}

const OrderButtons = ({
  Order,
  HandleOpenDialogCancelOrder,
  HandleOpenDialogOrderDelivered,
  HandleOpenDialogOrderPickedUp
}: OrderButtonsProps) => {
  const userAuth = useAppSelector(selectUserAuth);
  const getButtons = (): ReactElement[] => {
    const buttons: ReactElement[] = [];
    if (Order.canBeCanceled()) {
      buttons.push(
        <Button
          variant="contained"
          onClick={HandleOpenDialogCancelOrder}
          sx={{ width: '100%', color: '#fff' }}
          color="error">
          <Stack spacing={1} direction="row" alignItems={'center'}>
            <CancelIcon sx={{ fontSize: '20px' }} />
            <Typography>{'Siparişi Iptal Et'}</Typography>
          </Stack>
        </Button>
      );
    }
    if (userAuth.isAdmin && Order.canBeDelivered()) {
      buttons.push(
        <Button
          variant="contained"
          onClick={HandleOpenDialogOrderDelivered}
          sx={{ width: '100%', color: '#fff' }}
          color="admin">
          {'Sipariş Teslim Edildi'}
        </Button>
      );
    }
    if (userAuth.isAdmin && Order.canBePickedUp()) {
      buttons.push(
        <Button
          variant="contained"
          onClick={HandleOpenDialogOrderPickedUp}
          sx={{ width: '100%', color: '#fff' }}
          color="admin">
          {'Sipariş Hazırlandı'}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      {getButtons().length === 0 ? undefined : (
        <MainCard sx={{ mt: 2, p: '10px' }}>
          <List>
            {getButtons().map((b, i) => (
              <ListItem key={i}>{b}</ListItem>
            ))}
          </List>
        </MainCard>
      )}
    </>
  );
};

export { OrderButtons };
