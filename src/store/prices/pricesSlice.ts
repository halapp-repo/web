import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { Price } from '../../models/price';
import moment from 'moment';
import { PricesApi } from './pricesApi';

const initialState = {} as PricesState;

export const fetchPrices = createAsyncThunk<
  Price[],
  { location: string; type: string; date: string }
>('prices/fetch', async ({ location, type, date }) => {
  console.log(location, type, date);
  let response;
  if (date == moment.tz('Europe/Istanbul').format('YYYY-MM-DD')) {
    const yesterday = moment.tz('Europe/Istanbul').subtract(1, 'd').format('YYYY-MM-DD');
    response = await new PricesApi().fetchPrice(location, type, yesterday, date);
  } else {
    response = await new PricesApi().fetchPrice(location, type, date);
  }
  return response;
  // return [
  //   { Price: 10.34, ProductId: 'GRSB1001', TS: '2022-09-28T15:48:58+03:00', Unit: 'PK/125G' },
  //   { Price: 12.34, ProductId: 'GRSB1001', TS: '2022-09-29T15:48:58+03:00', Unit: 'PK/125G' },
  //   { Price: 23.5, ProductId: 'GPER1001', TS: '2022-09-29T15:48:58+03:00', Unit: 'KG' },
  //   { Price: 12.34, ProductId: 'GRSB1001', TS: '2022-09-29T15:50:57+03:00', Unit: 'PK/125G' },
  //   { Price: 23.5, ProductId: 'GPER1001', TS: '2022-09-29T15:50:57+03:00', Unit: 'KG' },
  //   { Price: 25.5, ProductId: 'GPER1001', TS: '2022-09-28T15:50:57+03:00', Unit: 'KG' }
  // ];
});

const PricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const date = action.meta.arg.date;
      state[date] = data;
    });
  }
});

//export const { } = ProductsSlice.actions;
export const selectPricesOfSelectedDate = createSelector(
  [(state: RootState) => state.prices, (state: RootState) => state.ui.prices.selectedDate],
  (prices, selectedDate) => prices[selectedDate]
);
export default PricesSlice.reducer;
