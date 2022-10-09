import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { plainToClass } from 'class-transformer';
import { RootState } from '..';
import { City } from '../../models/city';
import { DurationType } from '../../models/duration-type';
import { Price } from '../../models/price';
import { ProductType } from '../../models/product-type';
import { ProductPricesApi } from './productPricesApi';
import { ProductPricesState } from './productPricesState';

const initialState = {
  data: {},
  isLoading: false
} as ProductPricesState;

export const fetchProductPrices = createAsyncThunk<
  Price[],
  { productId: string; duration: DurationType; location: City; type: ProductType }
>('product-prices/fetch', async ({ productId, duration, location, type }): Promise<Price[]> => {
  // const response = await new ProductPricesApi().fetchProductPrices(
  //   productId,
  //   duration,
  //   location,
  //   type
  // );
  // return response;
  return [
    { Price: 22, ProductId: 'GSTB1001', TS: '2022-10-04T09:56:27+03:00', Unit: 'KG' },
    { Price: 27, ProductId: 'GSTB1001', TS: '2022-10-03T09:56:27+03:00', Unit: 'KG' },
    { Price: 25, ProductId: 'GSTB1001', TS: '2022-10-02T09:56:27+03:00', Unit: 'KG' },
    { Price: 24, ProductId: 'GSTB1001', TS: '2022-10-01T09:56:27+03:00', Unit: 'KG' },
    { Price: 23, ProductId: 'GSTB1001', TS: '2022-09-30T09:56:27+03:00', Unit: 'KG' }
  ].map((r) => plainToClass(Price, r));
});

const ProductPricesSlice = createSlice({
  name: 'product-prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const duration = action.meta.arg.duration;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        [duration]: data
      };
      state.isLoading = false;
    });
    builder.addCase(fetchProductPrices.rejected, (state, action) => {
      const duration = action.meta.arg.duration;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        [duration]: []
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
    (state: RootState, productId: string, duration: DurationType): [string, DurationType] => [
      productId,
      duration
    ]
  ],
  (prices, [productId, duration]) => prices[productId]?.[duration]
);
export const selectProductPricesIsLoading = createSelector(
  [(state: RootState) => state.productPrices.isLoading],
  (isLoading) => isLoading
);

export default ProductPricesSlice.reducer;
