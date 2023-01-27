import { OrderStatusType } from '@halapp/common';

const translateOrderStatus = (status: OrderStatusType): string => {
  if (status === OrderStatusType.Created) {
    return 'Sipariş verildi';
  } else if (status === OrderStatusType.Canceled) {
    return 'Iptal edildi.';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

export { translateOrderStatus };
