import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderDTO } from '../../models/dtos/order.dto';
import { Order } from '../../models/order';
import { OrderApi } from './ordersApi';
import { OrdersState } from './ordersState';
import moment from 'moment';
import { trMoment } from '../../utils/timezone';

const initialState = {
  IsLoading: false,
  List: {}
} as OrdersState;

export const createOrder = createAsyncThunk<Order, OrderDTO, { state: RootState }>(
  'orders/create',
  async (order, { getState }): Promise<Order> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    return await new OrderApi().createOrder({
      token: userAuth.idToken,
      order: order
    });
  }
);

interface FetchOrdersByMonthRequest {
  OrganizationId: string;
  Month: moment.Moment;
}
export const fetchOrdersByMonth = createAsyncThunk<
  Order[] | null,
  FetchOrdersByMonthRequest,
  { state: RootState }
>('orders/fetchAll', async ({ OrganizationId, Month }, { getState }): Promise<Order[] | null> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  return await new OrderApi().fetchOrders({
    token: userAuth.idToken,
    organizationId: OrganizationId,
    fromDate: Month.startOf('month'),
    toDate: Month.endOf('month')
  });
});

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.IsLoading = false;
      state.List[trMoment().format('MMYYYY')] = undefined;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByMonth.fulfilled, (state, action) => {
      const month = action.meta.arg.Month;
      const data = action.payload || [];
      state.List = {
        ...state.List,
        [month.format('MMYYYY')]: data
      };
      state.IsLoading = false;
    });
    //
    builder.addCase(fetchOrdersByMonth.rejected, (state) => {
      state.IsLoading = false;
    });
  }
});

export const selectOrdersByMonth = createSelector(
  [
    (state: RootState) => state.orders,
    (state: RootState, month: moment.Moment): moment.Moment => month
  ],
  (ord: OrdersState, month: moment.Moment) => {
    const list = ord.List[month.format('MMYYYY')];
    if (!list || list.length === 0) {
      return null;
    }
    return list;
  }
);
export const selectOrderIsLoading = createSelector(
  [(state: RootState) => state.orders],
  (ord: OrdersState) => ord.IsLoading
);

export default OrderSlice.reducer;
