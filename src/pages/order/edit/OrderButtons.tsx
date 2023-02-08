import { Button, List, ListItem } from '@mui/material';
import { Order } from '../../../models/order';
import { useAppSelector } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { ReactElement } from 'react';
import MainCard from '../../../components/MainCard';

interface OrderButtonsProps {
  Order: Order;
  HandleOpenDialogCancelOrder: () => void;
  HandleOpenDialogOrderDelivered: () => void;
}

const OrderButtons = ({
  Order,
  HandleOpenDialogCancelOrder,
  HandleOpenDialogOrderDelivered
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
          {'Siparişi Iptal Et'}
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
    return buttons;
  };

  return (
    <>
      {getButtons().length === 0 ? (
        <></>
      ) : (
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
