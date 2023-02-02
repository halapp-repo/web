import { Chip } from '@mui/material';
import { Order } from '../../models/order';
import { OrderStatusType } from '@halapp/common';
import { red, green, grey, blue } from '@mui/material/colors';
import { translateOrderStatus } from '../../utils/english-turkish-translator';

const getColor = (status: OrderStatusType): string => {
  if (status === OrderStatusType.Created) {
    return green['A400'];
  } else if (status === OrderStatusType.Canceled) {
    return red['A400'];
  } else if (status === OrderStatusType.Delivered) {
    return blue['A400'];
  } else {
    return grey['900'];
  }
};

interface StatusChipProps {
  Order: Order;
}

const StatusChip = ({ Order }: StatusChipProps) => {
  return (
    <Chip
      size="small"
      label={`${translateOrderStatus(Order.Status)}`}
      sx={{ backgroundColor: getColor(Order.Status), borderRadius: '36px', color: '#ffff' }}
    />
  );
};

export { StatusChip };
