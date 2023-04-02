import { OrderStatusType } from '@halapp/common';
import { Box, List, ListItem, ListItemButton, ListSubheader, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';

import MainCard from '../../../components/MainCard';
import { Order } from '../../../models/order';
import { DateRangeType } from '../../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../../models/types/order-status-extended.type';
import { getComparator } from '../../../utils/sort';
import OrderListItem from '../list/OrderListItem';

interface OrdersContentProps {
  Orders?: Order[] | null;
  IsLoading: boolean;
  DateFilter: DateRangeType;
  StatusFilter: OrderStatusType | OrderStatusExtendedType;
}

const createOrderListItem = (isLoading: boolean, orders?: Order[] | null) => {
  if (isLoading) {
    return (
      <ListItem key={`item-0`} sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </ListItem>
    );
  }
  if (!orders) {
    return (
      <ListItem key={`item--1`} sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" alignContent={'center'}>
          {'Sipariş bulunmamaktadir.'}
        </Typography>
      </ListItem>
    );
  } else {
    const itemsData = orders.sort(getComparator('desc', 'CreatedDate'));
    return itemsData.map((i) => (
      <ListItemButton key={`item-${i.Id}`} component={RouterLink} to={`/orders/${i.Id}`}>
        <MainCard sx={{ width: '100%', minHeight: '100px' }}>
          <OrderListItem Order={i} />
        </MainCard>
      </ListItemButton>
    ));
  }
};

const AdminOrdersContent = ({
  Orders,
  IsLoading,
  DateFilter,
  StatusFilter
}: OrdersContentProps) => {
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
              justifyContent: 'left',
              alignItems: 'center'
            }}
            id="nested-list-subheader">
            <Typography variant="h5" color="primary">
              {DateFilter}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ padding: '0px 5px' }}>
              {'|'}
            </Typography>
            <Typography variant="h5">{StatusFilter}</Typography>
          </ListSubheader>
        }>
        {createOrderListItem(IsLoading, Orders)}
      </List>
    </Box>
  );
};

export { AdminOrdersContent };
