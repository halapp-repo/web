import { CityType } from '@halapp/common';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { CitiesState } from './citiesState';

const initialState = {
  selectedCity: CityType.istanbul
} as CitiesState;

const CitiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeSelectedCity: (state: CitiesState, action: PayloadAction<CityType>) => {
      state.selectedCity = action.payload;
    }
  }
});

export const { changeSelectedCity } = CitiesSlice.actions;

export const selectSelectedCity = createSelector(
  [(state: RootState) => state.cities],
  (state: CitiesState): CityType => {
    return state.selectedCity;
  }
);

export default CitiesSlice.reducer;
