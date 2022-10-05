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
  return [
    { Price: 27, ProductId: 'GSTB1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 8, ProductId: 'GPTT1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 8, ProductId: 'GCLR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 4.5, ProductId: 'GCBB1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 16, ProductId: 'GPPP1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 20, ProductId: 'GBNN1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 14, ProductId: 'GCCM1004', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 12, ProductId: 'GJJB1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 4.5, ProductId: 'GMLN1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 14, ProductId: 'GGGP1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 13, ProductId: 'GGRP1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 6, ProductId: 'GRDS1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 6, ProductId: 'GLTT1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 4.5, ProductId: 'GCCR1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 4, ProductId: 'GCHR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 2, ProductId: 'GPRS1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 12, ProductId: 'GGGP1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 18, ProductId: 'GBEN1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 16, ProductId: 'GPPP1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 22, ProductId: 'GKIW1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 12, ProductId: 'GORG1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 12, ProductId: 'GBEN1005', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 52, ProductId: 'GGRL1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 23, ProductId: 'GTMT1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 11, ProductId: 'GBRC1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 16, ProductId: 'GTMT1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7, ProductId: 'GPLM1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2.5, ProductId: 'GCBB1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 30, ProductId: 'GPNA1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 7, ProductId: 'GONN1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 30, ProductId: 'GPPP1005', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 22, ProductId: 'GTMT1004', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2, ProductId: 'GSRR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 9, ProductId: 'GTMT1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 10, ProductId: 'GAVC1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 11, ProductId: 'GGRP1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2.5, ProductId: 'GDLL1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 7, ProductId: 'GTMT1006', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7, ProductId: 'GAPL1005', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 10, ProductId: 'GPMG1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 6, ProductId: 'GPLR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 11, ProductId: 'GNCT1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 30, ProductId: 'GPPP1004', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 12, ProductId: 'GBEN1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 11, ProductId: 'GAPL1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 16, ProductId: 'GPPP1010', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7, ProductId: 'GAPL1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2.5, ProductId: 'GPUR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 16, ProductId: 'GPPP1007', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 15, ProductId: 'GPPP1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 14, ProductId: 'GTMT1007', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 29, ProductId: 'GBNN1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7, ProductId: 'GAPL1004', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 18, ProductId: 'GTMT1005', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2, ProductId: 'GMNT1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 14, ProductId: 'GLMN1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 11, ProductId: 'GTNG1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 26, ProductId: 'GPPP1009', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 5, ProductId: 'GCCR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 3, ProductId: 'GRGL1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 17, ProductId: 'GPPP1006', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 15, ProductId: 'GPPP1008', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7.5, ProductId: 'GPTT1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 11, ProductId: 'GGGP1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 9, ProductId: 'GLTT1003', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 7, ProductId: 'GLLR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'ADET' },
    { Price: 11, ProductId: 'GORG1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 7, ProductId: 'GAPL1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 6, ProductId: 'GRDS1002', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 11, ProductId: 'GGRP1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 10, ProductId: 'GZCC1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 2.5, ProductId: 'GWCR1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'BAG' },
    { Price: 13, ProductId: 'GPCH1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 3.5, ProductId: 'GWTM1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' }
  ].map((r) => plainToClass(Price, r));
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

export const selectPricesOfSelectedDate = createSelector(
  [(state: RootState) => state.prices.data, (state: RootState) => state.ui.listing.selectedDate],
  (prices, selectedDate) => prices[selectedDate]
);
export const selectPriceIsLoading = createSelector(
  [(state: RootState) => state.prices.isLoading],
  (isLoading) => isLoading
);
export default PricesSlice.reducer;
