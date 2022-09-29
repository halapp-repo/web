import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { UIState } from './uiState';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  prices: {}
} as UIState;

const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updatePricesSelectedDate: (state: UIState, action: PayloadAction<string>) => {
      state.prices.selectedDate = action.payload;
    }
  }
});

export const { updatePricesSelectedDate } = UISlice.actions;
export const selectUIPricesSelectedDate = createSelector(
  (state: RootState) => state.ui,
  (state: UIState) => state.prices.selectedDate
);
export default UISlice.reducer;
