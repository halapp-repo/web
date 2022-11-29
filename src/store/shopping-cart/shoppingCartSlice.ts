import { createSelector, createSlice } from '@reduxjs/toolkit';
import { plainToInstance } from 'class-transformer';
import { ShoppingCartDTO } from '../../models/dtos/shopping-cart-list-item.dto';
import { Price } from '../../models/price';
import { ShoppingCart, ShoppingCartItem } from '../../models/shopping-cart';
import { RootState } from '../index';
import { InventoriesState } from '../inventories/inventoriesState';
import { selectPricesOfToday } from '../prices/pricesSlice';
import { ShoppingCartState } from './shoppingCartState';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cart: {
    Items: [
      {
        ProductId: 'GRSB1001',
        Count: 2
      },
      {
        ProductId: 'GPER1002',
        Count: 3
      },
      {
        ProductId: 'GPPP1004',
        Count: 7
      },
      {
        ProductId: 'GPPP1004',
        Count: 7
      },
      {
        ProductId: 'GPPP1004',
        Count: 7
      },
      {
        ProductId: 'GPPP1004',
        Count: 7
      }
    ]
  }
} as ShoppingCartState;

const ShoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {
    removeCartItem: (state: ShoppingCartState, action: PayloadAction<string>) => {
      state.cart = {
        ...state.cart,
        Items: [...(state.cart.Items || [])].filter((i) => i.ProductId !== action.payload)
      };
    },
    updateCartItemCount: (
      state: ShoppingCartState,
      action: PayloadAction<{ ProductId: string; Count: number }>
    ) => {
      state.cart = {
        ...state.cart,
        Items: [...(state.cart.Items || [])].map((i) => {
          if (i.ProductId === action.payload.ProductId) {
            i.Count = action.payload.Count;
          }
          return i;
        })
      };
    }
  }
});

export const { removeCartItem, updateCartItemCount } = ShoppingCartSlice.actions;

export const selectShoppingCart = createSelector(
  [(state: RootState) => state.shoppingCart],
  (state: ShoppingCartState): ShoppingCart => {
    return plainToInstance(ShoppingCart, state.cart);
  }
);

export const selectEnhancedShoppingCart = createSelector(
  [
    (state: RootState) => state.shoppingCart,
    (state: RootState) => state.inventories,
    selectPricesOfToday
  ],
  (
    state: ShoppingCartState,
    inventoryState: InventoriesState,
    prices: Price[]
  ): ShoppingCartDTO => {
    return plainToInstance(ShoppingCartDTO, {
      Items: state.cart.Items.map((itm) => {
        const price = prices?.find((p) => p.IsActive == true && p.ProductId === itm.ProductId);
        return {
          ProductId: itm.ProductId,
          Count: itm.Count,
          Name:
            inventoryState.inventories?.find((inv) => inv.ProductId === itm.ProductId)?.Name ||
            itm.ProductId,
          ...(price && price.Price > 0
            ? {
                Price: price.Price,
                Unit: price.Unit
              }
            : null)
        } as ShoppingCartItem;
      })
    } as ShoppingCart);
  }
);

export default ShoppingCartSlice.reducer;
