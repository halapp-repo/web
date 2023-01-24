import { OrderStatus } from '../models/order-status';

const translateOrderStatus = (status: OrderStatus): string => {
  if (status === OrderStatus.Created) {
    return 'Sipariş verildi';
  } else if (status === OrderStatus.Canceled) {
    return 'Iptal edildi.';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

export { translateOrderStatus };
