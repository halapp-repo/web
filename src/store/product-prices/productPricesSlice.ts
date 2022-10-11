import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { plainToClass } from 'class-transformer';
import { RootState } from '..';
import { City } from '../../models/city';
import { Price } from '../../models/price';
import { ProductType } from '../../models/product-type';
import { ProductPricesApi } from './productPricesApi';
import { ProductPricesState } from './productPricesState';
import { getComparator } from '../../utils/sort';
import { Slot } from '../../models/slot';

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
    slot: Slot;
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
    (state: RootState, productId: string, slot: Slot): [string, Slot] => [productId, slot]
  ],
  (prices, [productId, slot]) => {
    const tempPrice = prices[productId]?.[slot.key];
    if (!tempPrice) {
      return tempPrice;
    } else {
      return [...tempPrice].sort(getComparator('asc', 'TS')).map((p) => plainToClass(Price, p));
    }
  }
);
export const selectProductPricesIsLoading = createSelector(
  [(state: RootState) => state.productPrices.isLoading],
  (isLoading) => isLoading
);

export default ProductPricesSlice.reducer;
