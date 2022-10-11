import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { Price } from '../../models/price';
import moment from 'moment';
import { PricesApi } from './pricesApi';
import { plainToClass } from 'class-transformer';

const initialState = {
  data: {},
  isLoading: false
} as PricesState;

export const fetchPrices = createAsyncThunk<
  Price[],
  { location: string; type: string; date: string }
>('prices/fetch', async ({ location, type, date }): Promise<Price[]> => {
  let response;
  if (date == moment.tz('Europe/Istanbul').format('YYYY-MM-DD')) {
    const yesterday = moment.tz('Europe/Istanbul').subtract(1, 'd').format('YYYY-MM-DD');
    response = await new PricesApi().fetchPrice(location, type, yesterday, date);
  } else {
    response = await new PricesApi().fetchPrice(location, type, date, date);
  }
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
  (prices, selectedDate) => prices[selectedDate]?.map((p) => plainToClass(Price, p))
);
export const selectPriceIsLoading = createSelector(
  [(state: RootState) => state.prices.isLoading],
  (isLoading) => isLoading
);
export default PricesSlice.reducer;
