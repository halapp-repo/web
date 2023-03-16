import { DeliveryStrategy, ExtraCharge, PaymentStrategy } from '@halapp/common';
import { Organization } from '../organization';
import { ShoppingCartList } from '../viewmodels/shopping-cart-list-item';

const paymentStrategy = new PaymentStrategy();
const deliveryStrategy = new DeliveryStrategy();

export const getExtraCharges = ({
  shoppingCart,
  organization
}: {
  shoppingCart: ShoppingCartList;
  organization?: Organization;
}): ExtraCharge[] => {
  const charges: ExtraCharge[] = [];
  const deliveryExtraCharge = deliveryStrategy.execute(shoppingCart.Total);
  if (deliveryExtraCharge) {
    charges.push(deliveryExtraCharge);
  }
  if (organization) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paymentExtraCharge = paymentStrategy.execute({
      balance: organization.Balance,
      orderPrice: shoppingCart.Total
    });
    if (paymentExtraCharge) {
      charges.push(paymentExtraCharge);
    }
  }
  return charges;
};
