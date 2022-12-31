import { OrderItemDTO } from '../../models/dtos/order.dto';
import { OrganizationAddress } from '../../models/organization';
import { CheckoutForm } from './CheckoutForm';
import { useAppDispatch } from '../../store/hooks';
import { CreateOrder } from '../../store/order/orderSlice';
import { trMoment } from '../../utils/timezone';

const Checkout = () => {
  const dispatch = useAppDispatch();

  const handleOnsubmit = async (
    orderNote: string,
    organizationId: string,
    deliveryAddress: OrganizationAddress,
    orderItems: OrderItemDTO[]
  ): Promise<void> => {
    dispatch(
      CreateOrder({
        DeliveryAddress: deliveryAddress,
        Items: orderItems,
        OrganizationId: organizationId,
        Note: orderNote,
        TS: trMoment().valueOf()
      })
    );
  };

  return <CheckoutForm onSubmit={handleOnsubmit} />;
};

export default Checkout;
