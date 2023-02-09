import { OrderStatusType } from '@halapp/common';

const translateOrderStatus = (status: OrderStatusType): string => {
  if (status === OrderStatusType.Created) {
    return 'Sipariş verildi';
  } else if (status === OrderStatusType.Canceled) {
    return 'Iptal edildi';
  } else if (status === OrderStatusType.Delivered) {
    return 'Siparis teslim edildi';
  } else if (status === OrderStatusType.Paid) {
    return 'Sipariş ödendi';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

export { translateOrderStatus };
