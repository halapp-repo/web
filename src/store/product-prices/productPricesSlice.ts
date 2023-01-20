import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { City } from '../../models/city';
import { ProductType } from '../../models/product-type';
import { ProductPricesApi } from './productPricesApi';
import { ProductPricesState } from './productPricesState';
import { getComparator } from '../../utils/sort';
import { ChartSlot } from '../../models/chart-slot';
import { fetchPrices } from '../prices/pricesSlice';
import { IntervalType } from '../../models/interval-type';
import { trMoment } from '../../utils/timezone';
import { PriceVM } from '@halapp/common';
import { PriceToPriceDTOMapper } from '../../mappers/price-to-price-dto.mapper';

const initialState = {
  data: {},
  isLoading: false,
  chart: {
    slot: {
      '1WEEK': {
        key: '1WEEK',
        interval: IntervalType.daily,
        fromDate: () => {
          return trMoment().subtract(1, 'w').format('YYYY-MM-DD');
        },
        toDate: () => undefined
      },
      '1MONTH': {
        key: '1MONTH',
        interval: IntervalType.daily,
        fromDate: () => {
          return trMoment().subtract(1, 'M').format('YYYY-MM-DD');
        },
        toDate: () => undefined
      }
    }
  }
} as ProductPricesState;

export const fetchProductPrices = createAsyncThunk<
  PriceVM[],
  {
    productId: string;
    location: City;
    type: ProductType;
    slot: ChartSlot;
  }
>('product-prices/fetch', async ({ productId, location, type, slot }): Promise<PriceVM[]> => {
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
      for (const price of data) {
        if (price.IsToday == true && typeof price.Increase !== undefined) {
          const { ProductId } = price;
          state.data[ProductId] = {
            ...state.data[ProductId],
            dailyPriceIncrease: price.Increase || 0,
            currentPrice: price.Price
          };
        }
      }
    });
    builder.addCase(fetchProductPrices.fulfilled, (state, action) => {
      const data = action.payload;
      const slot = action.meta.arg.slot.key;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        intervalPrices: {
          ...state.data[productId]?.intervalPrices,
          [slot]: data
        }
      };
      state.isLoading = false;
    });
    builder.addCase(fetchProductPrices.rejected, (state, action) => {
      const slot = action.meta.arg.slot.key;
      const productId = action.meta.arg.productId;
      state.data[productId] = {
        ...state.data[productId],
        intervalPrices: {
          ...state.data[productId]?.intervalPrices,
          [slot]: []
        }
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
    const mapper = new PriceToPriceDTOMapper();
    const tempPrice = prices[productId]?.intervalPrices?.[slot.key];
    if (!tempPrice) {
      return tempPrice;
    } else {
      return mapper.toListModel([...tempPrice].sort(getComparator('asc', 'TS')));
    }
  }
);
export const selectProductPricesIsLoading = createSelector(
  [(state: RootState) => state.productPrices.isLoading],
  (isLoading) => isLoading
);
export const selectChartSlot = createSelector(
  (state: RootState) => state.productPrices,
  (state: ProductPricesState) => state.chart.slot
);
export const selectProductDailyPriceIncrease = createSelector(
  [
    (state: RootState) => state.productPrices,
    (state: RootState, productId: string): string => productId
  ],
  (state: ProductPricesState, productId: string) => state.data[productId]?.dailyPriceIncrease
);
export const selectProductCurrentPrice = createSelector(
  [
    (state: RootState) => state.productPrices,
    (state: RootState, productId: string): string => productId
  ],
  (state: ProductPricesState, productId: string) => state.data[productId]?.currentPrice
);
export default ProductPricesSlice.reducer;
