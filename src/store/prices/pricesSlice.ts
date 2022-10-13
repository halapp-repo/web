import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { Price } from '../../models/price';
import { PricesApi } from './pricesApi';

const initialState = {
  data: {},
  isLoading: false
} as PricesState;

export const fetchPrices = createAsyncThunk<
  Price[],
  { location: string; type: string; date: string }
>('prices/fetch', async ({ location, type, date }): Promise<Price[]> => {
  const response = await new PricesApi().fetchPrice(location, type, date);
  return response;
});

const PricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const date = action.meta.arg.date;
      state.data[date] = data;
      state.isLoading = false;
    });
    builder.addCase(fetchPrices.rejected, (state, action) => {
      const date = action.meta.arg.date;
      state.data[date] = [];
      state.isLoading = false;
    });
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export const selectPricesOfSelectedDate = createSelector(
  [(state: RootState) => state.prices.data, (state: RootState) => state.ui.listing.selectedDate],
  (prices, selectedDate) => prices[selectedDate]
);
export const selectPriceIsLoading = createSelector(
  [(state: RootState) => state.prices.isLoading],
  (isLoading) => isLoading
);
export default PricesSlice.reducer;
