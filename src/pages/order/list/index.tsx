import { Grid } from '@mui/material';
import { OrderStatusType } from '@halapp/common';
import MainCard from '../../../components/MainCard';
import OrdersContent from './OrdersContent';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import { selectUserAuth } from '../../../store/auth/authSlice';
import {
  fetchOrganizations,
  selectOrganizationIsLoading,
  selectOrganizations
} from '../../../store/organizations/organizationsSlice';
import { useNavigate } from 'react-router-dom';
import { Overlay } from '../../../components/Overlay';
import OrdersFilters from './OrdersFilter';
import {
  fetchOrdersByOrgId,
  selectOrderIsLoading,
  selectOrdersByOrgId
} from '../../../store/orders/ordersSlice';
import { trMoment } from '../../../utils/timezone';
import moment from 'moment';
import { selectOrdersFilter, setOrdersFilter } from '../../../store/ui/uiSlice';
import { RetryOnError } from '../../../components/RetryOnError';
import { Organization } from '../../../models/organization';

const OrderList = () => {
  const filter = useAppSelector(selectOrdersFilter);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(selectOrganizations);
  const ordersWithFilter = useAppSelector((state) =>
    selectOrdersByOrgId(state, selectedOrganizationId || '', filter)
  );
  const ordersAreLoading = useAppSelector(selectOrderIsLoading);
  const organizationIsLoading = useAppSelector(selectOrganizationIsLoading);
  const selectedOrganization = organizations?.find((o) => o.ID === selectedOrganizationId);

  useEffect(() => {
    if (!filter) {
      dispatch(setOrdersFilter(trMoment()));
    }
  }, []);

  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    } else {
      if (!organizations) {
        dispatch(fetchOrganizations());
      }
    }
  }, [userAuth]);

  useEffect(() => {
    if (!selectedOrganizationId) {
      return;
    }
    if (moment.isMoment(filter) && !ordersWithFilter) {
      dispatch(fetchOrdersByOrgId({ Filter: filter, OrganizationId: selectedOrganizationId }));
    } else if (OrderStatusType[filter as keyof typeof OrderStatusType] && !ordersWithFilter) {
      dispatch(
        fetchOrdersByOrgId({
          Filter: filter as OrderStatusType,
          OrganizationId: selectedOrganizationId
        })
      );
    }
  }, [filter, selectedOrganizationId]);

  const handleSetFilter = (filter: OrderStatusType | moment.Moment): void => {
    dispatch(setOrdersFilter(filter));
  };
  const handleSetOrganization = (organizationId: string): void => {
    setSelectedOrganizationId(organizationId);
  };
  const handleRetry = () => {
    dispatch(fetchOrganizations());
  };

  const getContent = (organizations: Organization[] | null | undefined, isLoading: boolean) => {
    if (isLoading === true || typeof organizations === 'undefined') {
      return <Overlay />;
    } else if (organizations === null) {
      return <RetryOnError HandleRetry={handleRetry} />;
    }
    return (
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <MainCard sx={{ mt: 2 }}>
            <OrdersFilters
              Organizations={organizations}
              Filter={filter}
              SetFilter={handleSetFilter}
              SetOrganization={handleSetOrganization}
              SelectedOrganization={selectedOrganizationId}
            />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <OrdersContent
            Orders={ordersWithFilter}
            IsLoading={ordersAreLoading}
            Filter={filter}
            SelectedOrganization={selectedOrganization}
          />
        </Grid>
      </Grid>
    );
  };

  return <>{getContent(organizations, organizationIsLoading)}</>;
};

export default OrderList;
