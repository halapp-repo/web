import moment from 'moment';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { InventoriesState } from './inventoriesState';
import type { RootState } from '../index';
import { Inventory } from '../../models/inventory';
import { InventoriesApi } from './inventoriesApi';

export const fetchInventories = createAsyncThunk<Inventory[]>('inventories/fetch', async () => {
  const rawLocalInventories = localStorage.getItem('inventories');
  if (rawLocalInventories) {
    const { ttl, inventories } = JSON.parse(rawLocalInventories);
    const duration = moment.duration(moment().diff(moment(ttl)));
    if (duration.asHours() < 6) {
      return inventories as Inventory[];
    }
  }
  const inventories = await new InventoriesApi().fetchInventories();
  localStorage.setItem(
    'inventories',
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
export default InventorySlice.reducer;
