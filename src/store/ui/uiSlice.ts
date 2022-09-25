import * as moment from 'moment-timezone'
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index'
import { UIState } from './uiState';


const initialState = {
    prices: {
        selectedDate: moment.tz('Europe/Istanbul').format("YYYY-MM-DD")
    }
} as UIState;


const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        updatePricesSelectedDate: (state: UIState, action) => {
            state.prices.selectedDate = action.payload
        }
    },
});

export const { updatePricesSelectedDate: updatedPricesSelectedDate } = UISlice.actions;
export const selectUIPrices = (state: RootState) => state.ui.prices
export default UISlice.reducer;
