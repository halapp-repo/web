import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { OrderDTO } from '../../models/dtos/order.dto';
import { Order } from '../../models/order';
import { OrderApi } from './orderApi';

const initialState = {
  isLoading: false
};

export const CreateOrder = createAsyncThunk<Order, OrderDTO, { state: RootState }>(
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

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {}
});

export default OrderSlice.reducer;
