import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderApi } from './ordersApi';
import { OrdersState } from './ordersState';
import moment from 'moment';
import { trMoment } from '../../utils/timezone';
import { OrderEventType, OrderItemVM, OrderStatusType, OrderVM } from '@halapp/common';
import { OrderToOrderVMMapper } from '../../mappers/order-to-order-vm.mapper';
import { signOut } from '../auth/authSlice';
import { OrderItemsUpdatedV1Payload } from '../../models/events/payloads/order-items-updated-v1.payload';

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

interface FetchOrdersByOrgId {
  OrganizationId: string;
  Filter: moment.Moment | OrderStatusType;
}
export const fetchOrdersByOrgId = createAsyncThunk<
  OrderVM[] | null,
  FetchOrdersByOrgId,
  { state: RootState }
>(
  'orders/fetchAll',
  async ({ OrganizationId, Filter }, { getState }): Promise<OrderVM[] | null> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    return await new OrderApi().fetchOrders({
      token: userAuth.idToken,
      organizationId: OrganizationId,
      fromDate: moment.isMoment(Filter) ? Filter.clone().startOf('month') : undefined,
      toDate: moment.isMoment(Filter) ? Filter.clone().endOf('month') : undefined,
      status: OrderStatusType[Filter as keyof typeof OrderStatusType]
    });
  }
);

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
  { OrderId: string; Status: OrderStatusType; OrganizationId: string },
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
  { OrderId: string; Items: OrderItemVM[]; OrganizationId: string },
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
    builder.addCase(fetchOrdersByOrgId.fulfilled, (state, action) => {
      const filter = action.meta.arg.Filter;
      const { OrganizationId } = action.meta.arg;
      const data = action.payload || [];
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [moment.isMoment(filter) ? filter.format('MMYYYY') : filter]: data
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByOrgId.rejected, (state, action) => {
      const filter = action.meta.arg.Filter;
      const { OrganizationId } = action.meta.arg;
      state.List[OrganizationId] = {
        ...state.List[OrganizationId],
        [moment.isMoment(filter) ? filter.format('MMYYYY') : filter]: undefined
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchOrdersByOrgId.pending, (state) => {
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
      const { OrderId, OrganizationId } = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [OrderId]: action.payload
      };
      state.List = {
        ...state.List,
        [OrganizationId]: {}
      };
      state.IsLoading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.IsLoading = false;
    });
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.IsLoading = true;
    });
    // Update Order Items
    builder.addCase(updateOrderItems.fulfilled, (state, action) => {
      const { OrderId, OrganizationId } = action.meta.arg;
      state.Edit = {
        ...state.Edit,
        [OrderId]: action.payload
      };
      state.List = {
        ...state.List,
        [OrganizationId]: {}
      };
      state.IsLoading = false;
    });
    builder.addCase(updateOrderItems.rejected, (state) => {
      state.IsLoading = false;
    });
    builder.addCase(updateOrderItems.pending, (state) => {
      state.IsLoading = true;
    });
  }
});

export const selectOrdersWithFilter = createSelector(
  [
    (state: RootState) => state.orders,
    (state: RootState) => state.inventories.inventories,
    (
      state: RootState,
      orgId: string,
      filter?: moment.Moment | OrderStatusType
    ): [string, moment.Moment | OrderStatusType | undefined] => [orgId, filter]
  ],
  (ord: OrdersState, inventories, [orgId, filter]) => {
    const mapper = new OrderToOrderVMMapper();
    if (!orgId || !filter) {
      return null;
    }
    let list;
    if (moment.isMoment(filter)) {
      list = ord.List[orgId]?.[filter.format('MMYYYY')];
    } else if (OrderStatusType[filter as keyof typeof OrderStatusType]) {
      list = ord.List[orgId]?.[filter];
    }
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
    order.Events?.forEach((i) => {
      if (i.EventType === OrderEventType.OrderItemsUpdatedV1) {
        (i.Payload as OrderItemsUpdatedV1Payload).DeletedItems.forEach((ii) => {
          ii.ProductName =
            inventories?.find((inv) => inv.ProductId === ii.ProductId)?.Name || ii.ProductId;
        });
      }
    });
    return order;
  }
);

export default OrderSlice.reducer;
