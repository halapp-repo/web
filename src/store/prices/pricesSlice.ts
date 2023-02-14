import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { PricesApi } from './pricesApi';
import { trMoment } from '../../utils/timezone';
import { PriceVM } from '@halapp/common';
import { PriceToPriceDTOMapper } from '../../mappers/price-to-price-dto.mapper';

const initialState = {
  data: {},
  isLoading: false
} as PricesState;

export const fetchPrices = createAsyncThunk<
  PriceVM[],
  { location: string; type: string; date: string }
>('prices/fetch', async ({ location, type, date }): Promise<PriceVM[]> => {
  const response = await new PricesApi().fetchPrice(location, type, date);
  return response;
});

export const fetchTodaysPrices = createAsyncThunk<PriceVM[], { location: string; type: string }>(
  'prices/fetchTodays',
  async ({ location, type }): Promise<PriceVM[]> => {
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
      const { location, date } = action.meta.arg;
      const data = action.payload;
      state.data[date] = {
        ...state.data[date],
        [location]: data
      };
      state.isLoading = false;
    });
    builder.addCase(fetchPrices.rejected, (state, action) => {
      const { date, location } = action.meta.arg;
      state.data[date] = {
        ...state.data[date],
        [location]: []
      };
      state.isLoading = false;
    });
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodaysPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const date = trMoment().format('YYYY-MM-DD');
      const { location } = action.meta.arg;
      state.data[date] = {
        ...state.data[date],
        [location]: data
      };
    });
    builder.addCase(fetchTodaysPrices.rejected, (state, action) => {
      const date = trMoment().format('YYYY-MM-DD');
      const { location } = action.meta.arg;
      state.data[date] = {
        ...state.data[date],
        [location]: []
      };
    });
  }
});

export const selectPricesOfSelectedDate = createSelector(
  [
    (state: RootState) => state.prices.data,
    (state: RootState) => state.inventories.inventories,
    (state: RootState) => state.ui.listing.selectedDate,
    (state: RootState) => state.cities.selectedCity
  ],
  (prices, inventories, selectedDate, selectedCity) => {
    const list = prices[selectedDate]?.[selectedCity] || undefined;
    const mapper = new PriceToPriceDTOMapper(inventories);
    return list && mapper.toListModel(list);
  }
);
export const selectPriceIsLoading = createSelector(
  [(state: RootState) => state.prices.isLoading],
  (isLoading) => isLoading
);
export const selectPricesOfToday = createSelector(
  [
    (state: RootState) => state.prices.data,
    (state: RootState) => state.inventories.inventories,
    (state: RootState) => state.cities.selectedCity
  ],
  (prices, inventories, selectedCity) => {
    const list = prices[trMoment().format('YYYY-MM-DD')]?.[selectedCity] || undefined;
    const mapper = new PriceToPriceDTOMapper(inventories);
    return list && mapper.toListModel(list);
  }
);
export const selectPriceListItemsOfSelectedDate = createSelector(
  [
    (state: RootState) => state.prices.data,
    (state: RootState) => state.inventories.inventories,
    (state: RootState) => state.ui.listing.selectedDate,
    (state: RootState) => state.cities.selectedCity
  ],
  (prices, inventories, selectedDate, selectedCity) => {
    const list = prices[selectedDate]?.[selectedCity] || undefined;
    const mapper = new PriceToPriceDTOMapper(inventories);
    return list && mapper.toListModel(list);
  }
);
export default PricesSlice.reducer;
