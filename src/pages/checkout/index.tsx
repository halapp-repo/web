import { useEffect } from 'react';
import { OrganizationAddress } from '../../models/organization';
import { CheckoutForm } from './CheckoutForm';
import { createOrder } from '../../store/orders/ordersSlice';
import { trMoment } from '../../utils/timezone';
import { OrganizationsContext } from './OrganizationsContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchOrganizations,
  selectOrganizationIsLoading,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { Overlay } from '../../components/Overlay';
import { useNavigate } from 'react-router-dom';
import { OrderItemVM, OrderVM } from '@halapp/common';

const Checkout = () => {
  const organizations = useAppSelector(selectOrganizations);
  const organizationIsLoading = useAppSelector(selectOrganizationIsLoading);
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
    orderItems: OrderItemVM[],
    deliveryTime: string
  ): Promise<void> => {
    await dispatch(
      createOrder({
        Id: '0',
        Status: '',
        CreatedBy: '',
        CreatedDate: '',
        DeliveryAddress: deliveryAddress,
        Items: orderItems,
        OrganizationId: organizationId,
        Note: orderNote,
        TS: trMoment().format(),
        DeliveryTime: deliveryTime
      } as OrderVM)
    );

    navigate('/orders');
  };

  return (
    <OrganizationsContext.Provider value={organizations?.List || []}>
      {organizationIsLoading && <Overlay />}
      <CheckoutForm onSubmit={handleOnsubmit} />
    </OrganizationsContext.Provider>
  );
};

export default Checkout;
