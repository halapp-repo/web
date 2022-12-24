import { OrderItemDTO } from '../../models/dtos/order-item.dto';
import { OrganizationAddress } from '../../models/organization';
import { CheckoutForm } from './CheckoutForm';
import { useAppDispatch } from '../../store/hooks';
import { CreateOrder } from '../../store/order/orderSlice';

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
        orderItems,
        deliveryAddress,
        orderNote,
        organizationId
      })
    );
  };

  return <CheckoutForm onSubmit={handleOnsubmit} />;
};

export default Checkout;
