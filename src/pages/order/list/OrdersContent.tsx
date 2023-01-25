import { Box, List, ListSubheader, ListItem, ListItemButton, Typography } from '@mui/material';
import { Order } from '../../../models/order';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import MainCard from '../../../components/MainCard';
import OrderListItem from './OrderListItem';
import { getComparator } from '../../../utils/sort';
import { OrderStatus } from '../../../models/order-status';

interface OrdersContentProps {
  Orders: Order[] | null;
  IsLoading: boolean;
  Filter?: OrderStatus | moment.Moment | null;
}

const createOrderListItem = (orders: Order[] | null, isLoading: boolean) => {
  if (isLoading) {
    return (
      <ListItem sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </ListItem>
    );
  }
  if (!orders) {
    return (
      <ListItem sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" alignContent={'center'}>
          {'Siparis bulunmamaktadir.'}
        </Typography>
      </ListItem>
    );
  } else {
    const itemsData = orders.sort(getComparator('desc', 'CreatedDate'));
    return itemsData.map((i) => (
      <ListItemButton key={`item-${i.Id}`}>
        <MainCard sx={{ width: '100%', minHeight: '100px' }}>
          <OrderListItem Order={i} />
        </MainCard>
      </ListItemButton>
    ));
  }
};

const OrdersContent = ({ Orders, IsLoading, Filter }: OrdersContentProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100%', backgroundColor: '#fafafb' }}>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          backgroundColor: '#fafafb',
          '& ul': { padding: 0 }
        }}
        subheader={
          <ListSubheader
            component="div"
            sx={{
              backgroundColor: '#fafafb',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px'
            }}
            id="nested-list-subheader">
            {Filter && moment.isMoment(Filter) && Filter.format('MMMM YYYY')}
          </ListSubheader>
        }>
        {createOrderListItem(Orders, IsLoading)}
      </List>
    </Box>
  );
};

export default OrdersContent;
