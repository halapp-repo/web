import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderItemDTO } from '../../models/dtos/order-item.dto';
import { Order } from '../../models/order';
import { OrganizationAddress } from '../../models/organization';
import { OrderApi } from './orderApi';

const initialState = {
  isLoading: false
};

export const CreateOrder = createAsyncThunk<
  void,
  {
    orderNote: string;
    organizationId: string;
    deliveryAddress: OrganizationAddress;
    orderItems: OrderItemDTO[];
  },
  { state: RootState }
>(
  'orders/create',
  async (
    { orderNote, organizationId, deliveryAddress, orderItems },
    { getState }
  ): Promise<void> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    const response = await new OrderApi().createOrder({
      deliveryAddress,
      orderItems,
      orderNote,
      organizationId,
      token: userAuth.idToken
    });
  }
);

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {}
});

export default OrderSlice.reducer;
