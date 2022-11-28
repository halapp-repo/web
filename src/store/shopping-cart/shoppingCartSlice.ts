import { createSelector, createSlice } from '@reduxjs/toolkit';
import { plainToInstance } from 'class-transformer';
import { ShoppingCart, ShoppingCartItem } from '../../models/shopping-cart';
import { RootState } from '../index';
import { InventoriesState } from '../inventories/inventoriesState';
import { ShoppingCartState } from './shoppingCartState';

const initialState = {
  items: [
    {
      productId: 'GRSB1001',
      count: 2
    },
    {
      productId: 'GPER1002',
      count: 3
    }
  ]
} as ShoppingCartState;

const ShoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {}
});

export const selectShoppingCart = createSelector(
  [(state: RootState) => state.shoppingCart, (state: RootState) => state.inventories],
  (state: ShoppingCartState, inventoryState: InventoriesState): ShoppingCart => {
    return plainToInstance(ShoppingCart, {
      Items: state.items.map(
        (itm) =>
          ({
            ProductId: itm.productId,
            Count: itm.count,
            Name:
              inventoryState.inventories?.find((inv) => inv.ProductId === itm.productId)?.Name ||
              itm.productId
          } as ShoppingCartItem)
      )
    } as ShoppingCart);
  }
);

export default ShoppingCartSlice.reducer;
