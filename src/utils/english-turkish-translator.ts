import { ExtraChargeType, OrderStatusType, PaymentMethodType } from '@halapp/common';

const translateOrderStatus = (status: OrderStatusType): string => {
  if (status === OrderStatusType.Created) {
    return 'Sipariş verildi';
  } else if (status === OrderStatusType.Canceled) {
    return 'Sipariş iptal edildi';
  } else if (status === OrderStatusType.PickedUp) {
    return 'Sipariş hazırlandı';
  } else if (status === OrderStatusType.Delivered) {
    return 'Sipariş teslim edildi';
  } else if (status === OrderStatusType.Paid) {
    return 'Sipariş ödendi';
  } else if (status === OrderStatusType.Completed) {
    return 'Sipariş tamamlandı';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

const translatePaymentMethodType = (paymentMethodType: PaymentMethodType): string => {
  if (paymentMethodType === PaymentMethodType.card) {
    return 'Kart ile';
  } else if (paymentMethodType === PaymentMethodType.balance) {
    return 'Bakiye ile';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

const translateExtraChargeType = (charges: ExtraChargeType): string => {
  if (charges === ExtraChargeType.lowPriceDeliveryCharge) {
    return 'Nakliye ücreti';
  } else if (charges === ExtraChargeType.usingCreditCharge) {
    return 'İşlem ücreti';
  } else {
    throw new Error('Bilinmeyen durum');
  }
};

export { translateOrderStatus, translatePaymentMethodType, translateExtraChargeType };
