import { OrderItemVM, OrderVM, PaymentMethodType, ProductType } from '@halapp/common';
import { Grid, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Overlay } from '../../components/Overlay';
import { OrganizationAddress } from '../../models/organization';
import { selectUserAuth } from '../../store/auth/authSlice';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createOrder } from '../../store/orders/ordersSlice';
import {
  fetchOrganizations,
  selectOrganizationIsLoading,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { fetchTodaysPrices, selectPriceIsLoading } from '../../store/prices/pricesSlice';
import { selectEnhancedShoppingCart } from '../../store/shopping-cart/shoppingCartSlice';
import { toggleShoppingCart, updateCheckout } from '../../store/ui/uiSlice';
import { trMoment } from '../../utils/timezone';
import { CheckoutForm } from './CheckoutForm';
import { OrganizationsContext } from './OrganizationsContext';
import { PaymentForm } from './PaymentForm';
import { ShoppingCartContext } from './ShoppingCartContext';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector(selectUserAuth);
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
  const navigate = useNavigate();

  useEffect(() => {
    // Organization
    if (
      authenticated == true &&
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
  const handleCheckout = async (
    creatingOrder: OrderVM,
    paymentMethodType: PaymentMethodType
  ): Promise<void> => {
    const preOrder = instanceToPlain(creatingOrder);
    const order = plainToInstance(OrderVM, {
      ...preOrder,
      City: selectedCity,
      PaymentMethodType: paymentMethodType,
      TS: trMoment().format()
    });
    await dispatch(createOrder(order)).then(() => navigate('/'));
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
        {activeStep === 1 && <PaymentForm onSubmit={handleCheckout} PreOrder={creatingOrder} />}
      </ShoppingCartContext.Provider>
    </OrganizationsContext.Provider>
  );
};

export default Checkout;
