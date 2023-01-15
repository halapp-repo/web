import { Box, List, ListSubheader, ListItem, ListItemButton, Typography } from '@mui/material';
import { Order } from '../../models/order';
import CircularProgress from '@mui/material/CircularProgress';
import { trMoment } from '../../utils/timezone';
import MainCard from '../../components/MainCard';
import OrderListItem from './OrderListItem';
import { getComparator } from '../../utils/sort';

interface OrdersContentProps {
  Orders: Order[] | null;
  IsLoading: boolean;
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
    const itemsData = orders.reduce((acc: Map<string, Order[]>, curr: Order) => {
      const key = curr.CreatedDate.format('DDMMYYYY');
      acc.set(key, [...(acc.get(key) || []), curr]);
      return acc;
    }, new Map<string, Order[]>());
    const sortedKey = [...itemsData.keys()].sort((a: string, b: string) => {
      const aMoment = trMoment(a, 'DDMMYYYY');
      const bMoment = trMoment(b, 'DDMMYYYY');
      return bMoment.isAfter(aMoment) ? 1 : -1;
    });
    return sortedKey.map((dateStr) => (
      <li key={`section-${dateStr}`}>
        <ul>
          <ListSubheader sx={{ backgroundColor: '#fafafb' }}>
            {trMoment(dateStr, 'DDMMYYYY').format('DD.MM.YYYY')}
          </ListSubheader>
          {(itemsData?.get(dateStr) || [])
            .sort(getComparator('desc', 'CreatedDate'))
            .map((item) => (
              <ListItemButton key={`item-${dateStr}-${item.Id}`}>
                <MainCard sx={{ width: '100%', minHeight: '100px' }}>
                  <OrderListItem Order={item} />
                </MainCard>
              </ListItemButton>
            ))}
        </ul>
      </li>
    ));
  }
};

const OrdersContent = ({ Orders, IsLoading }: OrdersContentProps) => {
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
        subheader={<li />}>
        {createOrderListItem(Orders, IsLoading)}
      </List>
    </Box>
  );
};

export default OrdersContent;
