import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { Price } from '../../models/price';
import { PricesApi } from './pricesApi';
import { trMoment } from '../../utils/timezone';
import { PriceListItemVM } from '../../models/viewmodels/price-list-item.dto';
import { plainToInstance } from 'class-transformer';

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

export const fetchTodaysPrices = createAsyncThunk<Price[], { location: string; type: string }>(
  'prices/fetchTodays',
  async ({ location, type }): Promise<Price[]> => {
    const response = await new PricesApi().fetchPrice(
      location,
      type,
      trMoment().format('YYYY-MM-DD')
    );
    return response;
  }
);

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
    builder.addCase(fetchTodaysPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const date = trMoment().format('YYYY-MM-DD');
      state.data[date] = data;
    });
    builder.addCase(fetchTodaysPrices.rejected, (state) => {
      const date = trMoment().format('YYYY-MM-DD');
      state.data[date] = [];
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
export const selectPricesOfToday = createSelector(
  [(state: RootState) => state.prices.data],
  (prices) => {
    return prices[trMoment().format('YYYY-MM-DD')];
  }
);
export const selectPriceListItemsOfSelectedDate = createSelector(
  [
    (state: RootState) => state.prices.data,
    (state: RootState) => state.inventories.inventories,
    (state: RootState) => state.ui.listing.selectedDate
  ],
  (prices, inventories, selectedDate) =>
    prices[selectedDate]?.map<PriceListItemVM>((p) =>
      plainToInstance(PriceListItemVM, {
        IsToday: p.IsToday || false,
        Price: p.Price,
        ProductId: p.ProductId,
        ProductName: inventories?.find((i) => i.ProductId == p.ProductId)?.Name || p.ProductId,
        Unit: p.Unit,
        Increase: p.Increase || 0,
        IsActive: p.IsActive || false
      })
    )
);
export default PricesSlice.reducer;
