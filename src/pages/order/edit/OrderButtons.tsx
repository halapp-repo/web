import { Button, List, ListItem } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderButtonsProps {
  Order: Order;
}

const OrderButtons = ({ Order }: OrderButtonsProps) => {
  return (
    <List>
      {Order.canCancel() && (
        <ListItem>
          <Button variant="contained" sx={{ width: '100%', color: '#fff' }} color="error">
            {'Siparişi Iptal Et'}
          </Button>
        </ListItem>
      )}
    </List>
  );
};

export { OrderButtons };
