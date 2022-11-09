import moment from 'moment';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { InventoriesState } from './inventoriesState';
import type { RootState } from '../index';
import { Inventory } from '../../models/inventory';
import { InventoriesApi } from './inventoriesApi';

const InventoriesLS = 'inventories';

export const fetchInventories = createAsyncThunk<Inventory[]>('inventories/fetch', async () => {
  const rawLocalInventories = localStorage.getItem(InventoriesLS);
  if (rawLocalInventories) {
    const { ttl, inventories } = JSON.parse(rawLocalInventories);
    const duration = moment.duration(moment().diff(moment(ttl)));
    if (duration.asHours() < 6) {
      return inventories as Inventory[];
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
