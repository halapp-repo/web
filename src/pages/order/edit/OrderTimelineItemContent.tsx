import { ReactNode } from 'react';
import { Card, CardHeader, Box, Typography } from '@mui/material';
import { OrderEvent } from '../../../models/order';
import { trMoment } from '../../../utils/timezone';

interface OrderTimelineItemContentProps {
  children?: ReactNode;
  Event: OrderEvent;
  sx?: object;
}

const OrderTimelineItemContent = ({ children, Event, sx }: OrderTimelineItemContentProps) => {
  const hourDuration = trMoment().diff(Event.TS, 'hours', true);
  return (
    <Box sx={{ ...sx, minHeight: '100px', paddingTop: '5px', paddingRight: '5px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" fontWeight="bold">
          {hourDuration > 24 ? Event.TS.format('DD.MM.YYYY HH:mm') : `${hourDuration} saat önce`}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export { OrderTimelineItemContent };
