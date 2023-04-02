import { InventoryVM } from '@halapp/common';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import type { RootState } from '../index';
import { InventoriesApi } from './inventoriesApi';
import { InventoriesState } from './inventoriesState';

const InventoriesLS = 'inventories';

export const fetchInventories = createAsyncThunk<InventoryVM[]>('inventories/fetch', async () => {
  const rawLocalInventories = localStorage.getItem(InventoriesLS);
  if (rawLocalInventories) {
    const { ttl, inventories } = JSON.parse(rawLocalInventories);
    const duration = moment.duration(moment().diff(moment(ttl)));
    if (duration.asHours() < 6) {
      return inventories as InventoryVM[];
    }
  }
  const inventories = await new InventoriesApi().fetchInventories();
  localStorage.setItem(
    InventoriesLS,
    JSON.stringify({
      ttl: moment().format(),
      inventories
    })
  );
  return inventories;
});

const initialState = {
  inventories: []
} as InventoriesState;
const InventorySlice = createSlice({
  name: 'inventories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventories.rejected, (state) => {
      state.inventories = null;
    });
    builder.addCase(fetchInventories.fulfilled, (state, action) => {
      const data = action.payload;
      state.inventories?.splice(0, state.inventories.length);
      state.inventories?.push(...data);
    });
  }
});

export const selectProducts = createSelector(
  [(state: RootState) => state.inventories.inventories],
  (invs) => invs?.filter((i) => i.InventoryType == 'product')
);
export const selectCategories = createSelector(
  [(state: RootState) => state.inventories.inventories],
  (invs) => invs?.filter((i) => i.InventoryType == 'category')
);
export const selectProductByProductId = createSelector(
  [
    (state: RootState) => state.inventories.inventories,
    (state: RootState, productId: string) => productId
  ],
  (state, productId) => state?.find((s) => s.ProductId == productId)
);
export default InventorySlice.reducer;
