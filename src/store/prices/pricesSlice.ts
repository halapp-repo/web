import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PricesState } from './pricesState';
import type { RootState } from '../index';
import { Price } from '../../models/price';
import moment from 'moment';
import { PricesApi } from './pricesApi';

const initialState = {
  data: {},
  isLoading: false
} as PricesState;

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
  //   { Price: 30, ProductId: 'GSTB1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 9, ProductId: 'GCLR1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 19, ProductId: 'GPPP1003', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 25, ProductId: 'GBNN1002', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GGRP1002', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 5, ProductId: 'GCHR1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'BAG' },
  //   { Price: 2, ProductId: 'GPRS1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'BAG' },
  //   { Price: 30, ProductId: 'GKIW1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GORG1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 55, ProductId: 'GGRL1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 13, ProductId: 'GBRC1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 20, ProductId: 'GTMT1003', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 31, ProductId: 'GPNA1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'ADET' },
  //   { Price: 10, ProductId: 'GTMT1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GGRP1003', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 14, ProductId: 'GNCT1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 16, ProductId: 'GBEN1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 6, ProductId: 'GPUR1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'BAG' },
  //   { Price: 20, ProductId: 'GPPP1007', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 19, ProductId: 'GPPP1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 13, ProductId: 'GPER1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 8, ProductId: 'GAPL1004', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 5.5, ProductId: 'GMLN1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 20, ProductId: 'GLMN1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 6, ProductId: 'GCCR1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 5, ProductId: 'GRGL1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'BAG' },
  //   { Price: 20, ProductId: 'GPPP1006', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 9, ProductId: 'GPTT1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GGGP1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GORG1002', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 8, ProductId: 'GAPL1002', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 6, ProductId: 'GRDS1002', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 12, ProductId: 'GGRP1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 11, ProductId: 'GZCC1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' },
  //   { Price: 4.5, ProductId: 'GWCR1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'BAG' },
  //   { Price: 10, ProductId: 'GPCH1001', TS: '2022-10-01T18:19:24+03:00', Unit: 'KG' }
  // ];
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

//export const { } = ProductsSlice.actions;
export const selectPricesOfSelectedDate = createSelector(
  [(state: RootState) => state.prices.data, (state: RootState) => state.ui.prices.selectedDate],
  (prices, selectedDate) => prices[selectedDate]
);
export const selectPriceIsLoading = createSelector(
  [(state: RootState) => state.prices.isLoading],
  (isLoading) => isLoading
);
export default PricesSlice.reducer;
