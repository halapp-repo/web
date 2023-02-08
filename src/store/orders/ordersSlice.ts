import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderApi } from './ordersApi';
import { OrdersState } from './ordersState';
import moment from 'moment';
import { trMoment } from '../../utils/timezone';
import { OrderItemVM, OrderStatusType, OrderVM } from '@halapp/common';
import { OrderToOrderVMMapper } from '../../mappers/order-to-order-vm.mapper';
import { signOut } from '../auth/authSlice';

const initialState = {
  IsLoading: false,
  List: {},
  Edit: {}
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
    fromDate: Month.clone().startOf('month'),
    toDate: Month.clone().endOf('month')
  });
});

export const fetchOrder = createAsyncThunk<OrderVM | null, string, { state: RootState }>(
  'order/fetchById',
  async (orderId, { getState }): Promise<OrderVM | null> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    return await new OrderApi().fetchOrder({
      token: userAuth.idToken,
      orderId: orderId
    });
  }
);

export const updateOrderStatus = createAsyncThunk<
  OrderVM,
  { OrderId: string; Status: OrderStatusType },
  { state: RootState }
>('order/updateStatus', async ({ OrderId, Status }, { getState }): Promise<OrderVM> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  return await new OrderApi().updateOrderStatus({
    token: userAuth.idToken,
    orderId: OrderId,
    newOrderStatus: Status
  });
});

export const updateOrderItems = createAsyncThunk<
  OrderVM,
  { OrderId: string; Items: OrderItemVM[] },
  { state: RootState }
>('order/updateItems', async ({ OrderId, Items }, { getState }): Promise<OrderVM> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  return await new OrderApi().updateOrderItems({
    token: userAuth.idToken,
    orderId: OrderId,
    items: Items
  });
});

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signOut.fulfilled, (state) => {
      state.List = {};
    });
    //Create Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
      const { OrganizationId } = action.meta.arg;
      state.IsLoading = false;
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [trMoment().format('MMYYYY')]: undefined
      };
    });
    builder.addCase(createOrder.pending, (state) => {
      state.IsLoading = true;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.IsLoading = false;
    });
    // Fetch Orders By Month
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
    builder.addCase(fetchOrdersByMonth.rejected, (state, action) => {
      const month = action.meta.arg.Month;
      const { OrganizationId } = action.meta.arg;
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [month.format('MMYYYY')]: undefined
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByMonth.pending, (state) => {
      state.IsLoading = true;
    });
    // Fetch Individual Order
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      const orderId = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [orderId]: action.payload
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      const orderId = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [orderId]: null
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrder.pending, (state) => {
      state.IsLoading = true;
    });
    // Update Order Status
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const { OrderId } = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [OrderId]: action.payload
      };
      state.IsLoading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.IsLoading = false;
    });
    builder.addCase(updateOrderStatus.pending, () => {
      // state.IsLoading = true;
    });
    // Update Order Items
    builder.addCase(updateOrderItems.fulfilled, (state, action) => {
      const { OrderId } = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [OrderId]: action.payload
      };
      state.IsLoading = false;
    });
    builder.addCase(updateOrderItems.rejected, (state) => {
      state.IsLoading = false;
    });
    builder.addCase(updateOrderItems.pending, () => {
      // state.IsLoading = true;
    });
  }
});

export const selectOrdersByMonth = createSelector(
  [
    (state: RootState) => state.orders,
    (state: RootState) => state.inventories.inventories,
    (
      state: RootState,
      orgId: string,
      month?: moment.Moment
    ): [string, moment.Moment | undefined] => [orgId, month]
  ],
  (ord: OrdersState, inventories, [orgId, month]) => {
    const mapper = new OrderToOrderVMMapper();
    if (!orgId || !month) {
      return null;
    }
    const list = ord.List[orgId]?.[month.format('MMYYYY')];
    if (!list || list.length === 0) {
      return undefined;
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
export const selectOrder = createSelector(
  [
    (state: RootState) => state.orders,
    (state: RootState) => state.inventories.inventories,
    (state: RootState, orderId?: string): string | undefined => orderId
  ],
  (ord: OrdersState, inventories, orderId) => {
    const mapper = new OrderToOrderVMMapper();
    if (!orderId) {
      return null;
    }
    const orderVM = ord.Edit[orderId];
    if (!orderVM) {
      return null;
    }
    const order = mapper.toModel(orderVM);
    order.Items.forEach((i) => {
      i.ProductName =
        inventories?.find((inv) => inv.ProductId === i.ProductId)?.Name || i.ProductId;
    });
    return order;
  }
);

export default OrderSlice.reducer;
