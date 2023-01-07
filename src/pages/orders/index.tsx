import { Grid } from '@mui/material';
import MainCard from '../../components/MainCard';
import OrdersContent from './OrdersContent';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { selectUserAuth } from '../../store/auth/authSlice';
import {
  fetchOrganizations,
  selectOrganizations
} from '../../store/organizations/organizationsSlice';
import { useNavigate } from 'react-router-dom';
import { Overlay } from '../../components/Overlay';
import OrdersFilters from './OrdersFilter';
import {
  fetchOrdersByMonth,
  selectOrderIsLoading,
  selectOrdersByMonth
} from '../../store/orders/ordersSlice';
import { trMoment } from '../../utils/timezone';
import moment from 'moment';
import { OrderStatus } from '../../models/order-status';

const ShoppingCart = () => {
  const [filter, setFilter] = useState<moment.Moment | OrderStatus | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(selectOrganizations);
  const orders = useAppSelector((state) => selectOrdersByMonth(state, trMoment()));
  const ordersAreLoading = useAppSelector(selectOrderIsLoading);

  useEffect(() => {
    setFilter(trMoment());
  }, []);

  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    } else {
      if (!organizations?.List) {
        dispatch(fetchOrganizations());
      }
    }
  }, [userAuth]);

  useEffect(() => {
    if (!selectedOrganization) {
      return;
    }
    if (!filter) {
      return;
    } else if (moment.isMoment(filter)) {
      dispatch(fetchOrdersByMonth({ Month: filter, OrganizationId: selectedOrganization }));
    }
  }, [filter, selectedOrganization]);

  const handleSetFilter = (filter: OrderStatus | moment.Moment): void => {
    setFilter(filter);
  };
  const handleSetOrganization = (organizationId: string): void => {
    setSelectedOrganization(organizationId);
  };

  return (
    <>
      {organizations?.IsLoading && <Overlay />}
      {organizations?.List && organizations?.List.length > 0 && (
        <Grid
          container
          rowSpacing={4.5}
          justifyContent="left"
          columnSpacing={2.75}
          alignItems="left">
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <MainCard sx={{ mt: 2 }}>
              <OrdersFilters
                Organizations={organizations.List}
                Filter={filter}
                SetFilter={handleSetFilter}
                SetOrganization={handleSetOrganization}
                SelectedOrganization={selectedOrganization}
              />
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <MainCard sx={{ mt: 2 }}>
              <OrdersContent Orders={orders} IsLoading={ordersAreLoading} />
            </MainCard>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ShoppingCart;
