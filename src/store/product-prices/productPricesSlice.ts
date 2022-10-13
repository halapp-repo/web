import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { City } from '../../models/city';
import { Price } from '../../models/price';
import { ProductType } from '../../models/product-type';
import { ProductPricesApi } from './productPricesApi';
import { ProductPricesState } from './productPricesState';
import { getComparator } from '../../utils/sort';
import { ChartSlot } from '../../models/chart-slot';
import { fetchPrices } from '../prices/pricesSlice';

const initialState = {
  data: {},
  isLoading: false
} as ProductPricesState;

export const fetchProductPrices = createAsyncThunk<
  Price[],
  {
    productId: string;
    location: City;
    type: ProductType;
    slot: ChartSlot;
  }
>('product-prices/fetch', async ({ productId, location, type, slot }): Promise<Price[]> => {
  const response = await new ProductPricesApi().fetchProductPrices(
    productId,
    slot.interval,
    location,
    type,
    slot.fromDate(),
    slot.toDate()
  );
  return response;
});

const ProductPricesSlice = createSlice({
  name: 'product-prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const data = action.payload;
    });
    builder.addCase(fetchProductPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const slot = action.meta.arg.slot.key;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        [slot]: data
      };
      state.isLoading = false;
    });
    builder.addCase(fetchProductPrices.rejected, (state, action) => {
      const slot = action.meta.arg.slot.key;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        [slot]: []
      };
      state.isLoading = false;
    });
    builder.addCase(fetchProductPrices.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export const selectProductPrices = createSelector(
  [
    (state: RootState) => state.productPrices.data,
    (state: RootState, productId: string, slot: ChartSlot): [string, ChartSlot] => [productId, slot]
  ],
  (prices, [productId, slot]) => {
    const tempPrice = prices[productId]?.[slot.key];
    if (!tempPrice) {
      return tempPrice;
    } else {
      return [...tempPrice].sort(getComparator('asc', 'TS'));
    }
  }
);
export const selectProductPricesIsLoading = createSelector(
  [(state: RootState) => state.productPrices.isLoading],
  (isLoading) => isLoading
);

export default ProductPricesSlice.reducer;
