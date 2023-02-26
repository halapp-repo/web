import { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Grid, StepButton } from '@mui/material';
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
import { updateCheckout } from '../../store/ui/uiSlice';
import { PaymentForm } from './PaymentForm';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [creatingOrder, setCreatingOrder] = useState<OrderVM | null>(null);
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

  const handleMoveToPayment = async (
    orderNote: string,
    organizationId: string,
    deliveryAddress: OrganizationAddress,
    orderItems: OrderItemVM[],
    deliveryTime: string
  ): Promise<void> => {
    setCreatingOrder({
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
    } as OrderVM);
    setCompleted({
      0: true,
      1: false
    });
    dispatch(
      updateCheckout({
        deliveryTime: deliveryTime,
        note: orderNote,
        organizationId: organizationId
      })
    );
    setActiveStep(1);
  };
  const handlePayment = async (): Promise<void> => {
    //
  };

  return (
    <OrganizationsContext.Provider value={organizations?.List || []}>
      {organizationIsLoading && <Overlay />}
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={12} md={6}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step key={'shipping'} completed={completed[0]}>
              <StepButton
                sx={{ padding: '0', margin: '0' }}
                onClick={() => {
                  setActiveStep(0);
                }}>
                {'Teslimat'}
              </StepButton>
            </Step>
            <Step key={'payment'} completed={completed[1]}>
              <StepLabel>{'Ödeme'}</StepLabel>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
      {activeStep === 0 && <CheckoutForm onSubmit={handleMoveToPayment} />}
      {activeStep === 1 && <PaymentForm onSubmit={handlePayment} />}
    </OrganizationsContext.Provider>
  );
};

export default Checkout;
