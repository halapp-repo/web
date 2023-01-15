import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderApi } from './ordersApi';
import { OrdersState } from './ordersState';
import moment from 'moment';
import { trMoment } from '../../utils/timezone';
import { OrderVM } from '@halapp/common';
import { OrderToOrderVMMapper } from '../../mappers/order-to-order-vm.mapper';
import { InventoriesState } from '../inventories/inventoriesState';

const initialState = {
  IsLoading: false,
  List: {}
} as OrdersState;

export const createOrder = createAsyncThunk<OrderVM, OrderVM, { state: RootState }>(
  'orders/create',
  async (order, { getState }): Promise<OrderVM> => {
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
  OrderVM[] | null,
  FetchOrdersByMonthRequest,
  { state: RootState }
>('orders/fetchAll', async ({ OrganizationId, Month }, { getState }): Promise<OrderVM[] | null> => {
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
      const { OrganizationId } = action.meta.arg;
      state.IsLoading = false;
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [trMoment().format('MMYYYY')]: undefined
      };
    });
    builder.addCase(createOrder.pending, (state, action) => {
      state.IsLoading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByMonth.fulfilled, (state, action) => {
      const month = action.meta.arg.Month;
      const { OrganizationId } = action.meta.arg;
      const data = action.payload || [];
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [month.format('MMYYYY')]: data
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByMonth.rejected, (state) => {
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByMonth.pending, (state) => {
      state.IsLoading = true;
    });
  }
});

export const selectOrdersByMonth = createSelector(
  [
    (state: RootState) => state.orders,
    (state: RootState) => state.inventories.inventories,
    (state: RootState, orgId: string, month: moment.Moment): [string, moment.Moment] => [
      orgId,
      month
    ]
  ],
  (ord: OrdersState, inventories, [orgId, month]) => {
    const mapper = new OrderToOrderVMMapper();
    if (!orgId || !month) {
      return null;
    }
    const list = ord.List[orgId]?.[month.format('MMYYYY')];
    if (!list || list.length === 0) {
      return null;
    }
    const orderList = mapper.toListModel(list);
    orderList.forEach((o) => {
      o.Items.forEach((i) => {
        i.ProductName =
          inventories?.find((inv) => inv.ProductId === i.ProductId)?.Name || i.ProductId;
      });
    });
    return orderList;
  }
);
export const selectOrderIsLoading = createSelector(
  [(state: RootState) => state.orders],
  (ord: OrdersState) => ord.IsLoading
);

export default OrderSlice.reducer;
