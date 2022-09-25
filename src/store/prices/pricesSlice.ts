import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PriceState } from './priceState';
import type { RootState } from '../index';
import { PriceApi } from './priceApi';
import { Price } from '../../models/price';

const initialState = {} as PriceState;

export const fetchPrices = createAsyncThunk<
  Price[],
  { location: string; type: string; date: string }
>('prices/fetch', async ({ location, type, date }) => {
  console.log(location, type, date);
  // const response = await new PriceApi().fetchPrice(location, type, date)
  return [
    { Price: 12.5, ProductId: 'ABC', Unit: 'TEXT' },
    { Price: 1.5, ProductId: 'DEF', Unit: 'TEXT' },
    { Price: 3.5, ProductId: 'GEF', Unit: 'TEXT' }
  ];
});

const ProductsSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const date = action.meta.arg.date;
      console.log(data);
      state[date] = data;
    });
  }
});

//export const { } = ProductsSlice.actions;
export const selectPrice = (state: RootState) => state.prices;
export default ProductsSlice.reducer;
