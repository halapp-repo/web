import { Grid } from '@mui/material';
import { OrderStatusType } from '@halapp/common';
import MainCard from '../../../components/MainCard';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useEffect, useMemo } from 'react';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllOrders,
  selectOrderIsLoading,
  selectOrders
} from '../../../store/orders/ordersSlice';
import { trMoment } from '../../../utils/timezone';
import { selectOrdersAdminFilter, setOrdersAdminFilter } from '../../../store/ui/uiSlice';
import { AdminOrderFilter } from './AdminOrdersFilter';
import { DateRangeType } from '../../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../../models/types/order-status-extended.type';
import { DateRange } from './date-range.type';
import { AdminOrdersContent } from './AdminOrdersContent';

const AdminOrderList = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const adminFilter = useAppSelector(selectOrdersAdminFilter);
  const dispatch = useAppDispatch();
  const range: DateRange = useMemo(
    () =>
      ({
        [DateRangeType.Today]: {
          from: trMoment().clone().startOf('D'),
          to: trMoment().clone().endOf('D')
        },
        [DateRangeType.Yesterday]: {
          from: trMoment().clone().add(-1, 'day').startOf('D'),
          to: trMoment().clone().add(-1, 'day').endOf('D')
        },
        [DateRangeType['Last 3 Days']]: {
          from: trMoment().clone().add(-3, 'day').startOf('D'),
          to: trMoment().clone().endOf('D')
        },
        [DateRangeType['Last 7 Days']]: {
          from: trMoment().clone().add(-7, 'day').startOf('D'),
          to: trMoment().clone().endOf('D')
        },
        [DateRangeType['Last 30 Days']]: {
          from: trMoment().clone().add(-30, 'day').startOf('D'),
          to: trMoment().clone().endOf('D')
        },
        [DateRangeType['This Month']]: {
          from: trMoment().clone().startOf('M'),
          to: trMoment().clone().endOf('M')
        },
        [DateRangeType['Last Month']]: {
          from: trMoment().clone().add(-1, 'month').startOf('M'),
          to: trMoment().clone().add(-1, 'month').endOf('M')
        },
        [DateRangeType['This Year']]: {
          from: trMoment().clone().startOf('year'),
          to: trMoment().clone().endOf('year')
        },
        [DateRangeType['Last Year']]: {
          from: trMoment().clone().add(-1, 'year').startOf('year'),
          to: trMoment().clone().add(-1, 'year').endOf('year')
        },
        [DateRangeType['All Time']]: {
          from: trMoment('2023-01-01').clone(),
          to: trMoment().clone().endOf('year')
        }
      } as DateRange),
    []
  );
  const orders = useAppSelector((state) =>
    selectOrders(state, adminFilter.date, adminFilter.status)
  );
  const ordersAreLoading = useAppSelector(selectOrderIsLoading);

  useEffect(() => {
    if (adminFilter) {
      dispatch(
        fetchAllOrders({
          Status: adminFilter.status,
          RangeType: adminFilter.date,
          FromDate: range[adminFilter.date].from,
          ToDate: range[adminFilter.date].to
        })
      );
    }
  }, [adminFilter]);

  useEffect(() => {
    if (!userAuth.isAdmin) {
      navigate('/dashboard');
    }
  }, [userAuth]);

  const handleUpdateFilter = (
    dateRangeFilter?: DateRangeType,
    statusFilter?: OrderStatusType | OrderStatusExtendedType
  ) => {
    if (
      dateRangeFilter &&
      dateRangeFilter === DateRangeType['All Time'] &&
      ((statusFilter && statusFilter === OrderStatusExtendedType.AllStatus) ||
        (!statusFilter && adminFilter.status === OrderStatusExtendedType.AllStatus))
    ) {
      statusFilter = OrderStatusType.Created;
    } else if (
      statusFilter &&
      statusFilter === OrderStatusExtendedType.AllStatus &&
      ((dateRangeFilter && dateRangeFilter === DateRangeType['All Time']) ||
        (!dateRangeFilter && adminFilter.date === DateRangeType['All Time']))
    ) {
      statusFilter = OrderStatusType.Created;
    }
    dispatch(setOrdersAdminFilter([dateRangeFilter, statusFilter]));
  };

  return (
    <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
      <Grid item xs={12} sm={3} md={3} lg={3}>
        <MainCard sx={{ mt: 2 }}>
          <AdminOrderFilter
            Range={range}
            SetDateRangeFilter={(date) => handleUpdateFilter(date, undefined)}
            SetStatusFilter={(status) => handleUpdateFilter(undefined, status)}
            DateRangeFilter={adminFilter.date}
            StatusFilter={adminFilter.status}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <AdminOrdersContent
          Orders={orders}
          IsLoading={ordersAreLoading}
          DateFilter={adminFilter.date}
          StatusFilter={adminFilter.status}
        />
      </Grid>
    </Grid>
  );
};

export default AdminOrderList;
