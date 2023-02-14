import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { OrderEvent } from '../../../models/events/order-event';
import { trMoment } from '../../../utils/timezone';

interface OrderTimelineItemContentProps {
  children?: ReactNode;
  Event: OrderEvent;
  sx?: object;
}

const OrderTimelineItemContent = ({ children, Event, sx }: OrderTimelineItemContentProps) => {
  const hourDuration = trMoment().diff(Event.TS, 'hours');
  return (
    <Box sx={{ ...sx, minHeight: '100px', paddingTop: '5px', paddingRight: '5px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" fontWeight="bold" color="secondary">
          {hourDuration > 24 ? Event.TS.format('MMM DD,YYYY HH:mm') : Event.TS.fromNow()}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export { OrderTimelineItemContent };
