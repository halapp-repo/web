import { useEffect } from 'react';
import { OrderItemDTO } from '../../models/dtos/order.dto';
import { OrganizationAddress } from '../../models/organization';
import { CheckoutForm } from './CheckoutForm';
import { createOrder } from '../../store/orders/ordersSlice';
import { trMoment } from '../../utils/timezone';
import { OrganizationsContext } from './OrganizationsContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchOrganizations,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { removeAllItems } from '../../store/shopping-cart/shoppingCartSlice';
import { Overlay } from '../../components/Overlay';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const organizations = useAppSelector(selectOrganizations);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      typeof organizations === 'undefined' ||
      typeof organizations.List === 'undefined' ||
      organizations.List.length === 0
    ) {
      dispatch(fetchOrganizations());
    }
  }, []);

  const handleOnsubmit = async (
    orderNote: string,
    organizationId: string,
    deliveryAddress: OrganizationAddress,
    orderItems: OrderItemDTO[]
  ): Promise<void> => {
    await dispatch(
      createOrder({
        DeliveryAddress: deliveryAddress,
        Items: orderItems,
        OrganizationId: organizationId,
        Note: orderNote,
        TS: trMoment().format()
      })
    );
    dispatch(removeAllItems());
    navigate('/orders');
  };

  return (
    <OrganizationsContext.Provider value={organizations?.List || []}>
      {organizations?.IsLoading && <Overlay />}
      <CheckoutForm onSubmit={handleOnsubmit} />
    </OrganizationsContext.Provider>
  );
};

export default Checkout;
