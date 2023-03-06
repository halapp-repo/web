import { Box, List, ListSubheader, ListItem, ListItemButton, Typography } from '@mui/material';
import { Order } from '../../../models/order';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import MainCard from '../../../components/MainCard';
import OrderListItem from './OrderListItem';
import { getComparator } from '../../../utils/sort';
import { OrderStatusType } from '@halapp/common';
import { Link as RouterLink } from 'react-router-dom';
import { Organization } from '../../../models/organization';
import { translateOrderStatus } from '../../../utils/english-turkish-translator';

interface OrdersContentProps {
  SelectedOrganization?: Organization;
  Orders?: Order[] | null;
  IsLoading: boolean;
  Filter?: OrderStatusType | moment.Moment | null;
}

const createOrderListItem = (isLoading: boolean, orders?: Order[] | null) => {
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

const OrdersContent = ({ Orders, IsLoading, Filter, SelectedOrganization }: OrdersContentProps) => {
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
              {SelectedOrganization && `${SelectedOrganization.Name}`}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ padding: '0px 5px' }}>
              {'|'}
            </Typography>
            <Typography variant="h5">
              {Filter && moment.isMoment(Filter) && Filter.format(' MMMM YYYY')}
              {Filter &&
                OrderStatusType[Filter as keyof typeof OrderStatusType] &&
                translateOrderStatus(Filter as OrderStatusType)}
            </Typography>
          </ListSubheader>
        }>
        {createOrderListItem(IsLoading, Orders)}
      </List>
    </Box>
  );
};

export default OrdersContent;
