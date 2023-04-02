import { OrderStatusType, translateOrderStatus } from '@halapp/common';
import { Chip } from '@mui/material';
import { blue, green, grey, lightBlue, purple, red } from '@mui/material/colors';

import { Order } from '../../models/order';

const getColor = (status: OrderStatusType): string => {
  if (status === OrderStatusType.Created) {
    return green['A400'];
  } else if (status === OrderStatusType.Canceled) {
    return red['A400'];
  } else if (status === OrderStatusType.PickedUp) {
    return lightBlue['A400'];
  } else if (status === OrderStatusType.Delivered) {
    return blue['A400'];
  } else if (status === OrderStatusType.Paid) {
    return purple['A400'];
  } else if (status === OrderStatusType.Completed) {
    return green['A700'];
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
      sx={{ backgroundColor: getColor(Order.Status), color: '#ffff' }}
    />
  );
};

export { StatusChip };
