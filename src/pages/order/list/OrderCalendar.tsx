import { Box, useMediaQuery, Theme } from '@mui/material';
import { Order } from '../../../models/order';

interface OrderCalendarProps {
  Order: Order;
}

const OrderCalendar = ({ Order }: OrderCalendarProps) => {
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const getContent = () => {
    return (
      <>
        <Box
          sx={{
            height: '30%',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#f72222'
          }}>
          {Order.CreatedDate.format('MMMM')}
        </Box>
        <Box
          sx={{
            height: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '48px',
            fontWeight: '100'
          }}>
          {Order.CreatedDate.format('DD')}
        </Box>
      </>
    );
  };
  return (
    <>
      {matchesSM && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            border: '1px solid #d9d9d9'
          }}>
          {getContent()}
        </Box>
      )}
      {matchesSM || (
        <Box
          sx={{
            margin: '10px',
            width: '100px',
            minHeight: '100px',
            border: '1px solid #d9d9d9',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
          {getContent()}
        </Box>
      )}
    </>
  );
};

export { OrderCalendar };
