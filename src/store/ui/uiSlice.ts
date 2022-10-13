import moment from 'moment';
import 'moment-timezone';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { UIState } from './uiState';
import type { PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../models/city';
import { IntervalType } from '../../models/interval-type';
import { trMoment } from '../../utils/timezone';
import { ProductType } from '../../models/product-type';

const initialState = {
  listing: {
    filteredProductName: '',
    selectedCity: City.istanbul,
    selectedDate: trMoment().format('YYYY-MM-DD'),
    selectedCategory: ProductType.produce
  },
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
} as UIState;

const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateListingSelectedDate: (
      state: UIState,
      action: PayloadAction<string | undefined | null>
    ) => {
      const rawPayload = action.payload;
      let selectedDate: string;
      if (!rawPayload || !moment(rawPayload).isValid()) {
        selectedDate = moment.tz('Europe/Istanbul').format('YYYY-MM-DD');
      } else {
        selectedDate = rawPayload;
      }
      state.listing.selectedDate = selectedDate;
      const url = new URL(window.location.href);
      url.searchParams.set('selected_date', selectedDate);
      window.history.pushState({}, '', url);
    },
    updateListingProductNameFilter: (state: UIState, action: PayloadAction<string>) => {
      state.listing.filteredProductName = action.payload.toLowerCase();
    }
  }
});

export const { updateListingSelectedDate, updateListingProductNameFilter } = UISlice.actions;
export const selectUIListingSelectedDate = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedDate
);
export const selectUIListingSelectedCategory = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedCategory
);
export const selectUIListingProductNameFilter = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.filteredProductName
);
export const selectUIListingSelectedCity = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.listing.selectedCity
);
export const selectChartSlot = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.chart.slot
);
export default UISlice.reducer;
