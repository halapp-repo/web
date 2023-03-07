/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { OrderItemVM, OrderVM, ProductType } from '@halapp/common';
import { toggleShoppingCart, updateCheckout } from '../../store/ui/uiSlice';
import { PaymentForm } from './PaymentForm';
import { selectUserAuth } from '../../store/auth/authSlice';
import { ShoppingCartContext } from './ShoppingCartContext';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { fetchTodaysPrices, selectPriceIsLoading } from '../../store/prices/pricesSlice';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { plainToInstance } from 'class-transformer';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);
  const organizations = useAppSelector(selectOrganizations);
  const organizationAreLoading = useAppSelector(selectOrganizationIsLoading);
  const pricesAreLoading = useAppSelector(selectPriceIsLoading);
  const selectedCity = useAppSelector(selectSelectedCity);
  const ShoppingCart = useAppSelector(selectEnhancedShoppingCart);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [creatingOrder, setCreatingOrder] = useState<OrderVM>(plainToInstance(OrderVM, {}));

  // const navigate = useNavigate();

  useEffect(() => {
    // Organization
    if (
      userAuth.authenticated == true &&
      (typeof organizations === 'undefined' || organizations === null || organizations.length === 0)
    ) {
      dispatch(fetchOrganizations());
    }
    // Price
    dispatch(
      fetchTodaysPrices({
        location: selectedCity,
        type: ProductType.produce
      })
    );
    const timer = setInterval(() => {
      dispatch(fetchTodaysPrices({ location: selectedCity, type: ProductType.produce }));
    }, 600000);

    return () => {
      clearTimeout(timer);
      dispatch(toggleShoppingCart(false));
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const handleMoveToPayment = async (
    orderNote: string,
    organizationId: string,
    deliveryAddress: OrganizationAddress,
    orderItems: OrderItemVM[],
    deliveryTime: string
  ): Promise<void> => {
    const preOrder = plainToInstance(OrderVM, {
      DeliveryAddress: deliveryAddress,
      Items: orderItems,
      OrganizationId: organizationId,
      Note: orderNote,
      DeliveryTime: deliveryTime
    });
    setCreatingOrder(preOrder);
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
    <OrganizationsContext.Provider value={organizations || []}>
      <ShoppingCartContext.Provider value={ShoppingCart}>
        {(organizationAreLoading || pricesAreLoading) && <Overlay />}
        <Grid
          container
          rowSpacing={4.5}
          justifyContent="left"
          columnSpacing={2.75}
          alignItems="left">
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
        {activeStep === 1 && <PaymentForm onSubmit={handlePayment} PreOrder={creatingOrder} />}
      </ShoppingCartContext.Provider>
    </OrganizationsContext.Provider>
  );
};

export default Checkout;
