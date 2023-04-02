import { Box, List, ListItem, Typography } from '@mui/material';

import { OrderEvent } from '../../../models/events/order-event';
import { getComparator } from '../../../utils/sort';
import { OrderTimelineItem } from './OrderTimelineItem';

interface OrderTimelineProps {
  Events?: OrderEvent[];
}

const OrderTimeline = ({ Events }: OrderTimelineProps) => {
  const getContent = () => {
    if (!Events || Events.length === 0) {
      return (
        <ListItem sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" alignContent={'center'}>
            {'Sipariş bulunmamaktadir.'}
          </Typography>
        </ListItem>
      );
    } else {
      return Events.sort(getComparator('desc', 'TS')).map((e, i) => (
        <ListItem key={i} sx={{ width: '100%' }}>
          <OrderTimelineItem Event={e} />
        </ListItem>
      ));
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        margin: '40px 0',
        '&:after': {
          backgroundColor: '#ffc423',
          content: "''",
          position: 'absolute',
          left: '0',
          width: '4px',
          height: '100%'
        }
      }}>
      <List
        sx={{
          margin: '10px 0',
          width: '100%'
        }}>
        {getContent()}
      </List>
    </Box>
  );
};

export { OrderTimeline };
