import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { plainToInstance } from 'class-transformer';

import { USERSESSION } from '../../models/constants/user-session';
import { Price } from '../../models/price';
import { ShoppingCart } from '../../models/shopping-cart';
import {
  ShoppingCartList,
  ShoppingCartListItem
} from '../../models/viewmodels/shopping-cart-list-item';
import { UserSessionStorage } from '../../models/viewmodels/user-session.storage';
import { RootState } from '../index';
import { InventoriesState } from '../inventories/inventoriesState';
import { createOrder } from '../orders/ordersSlice';
import { selectPricesOfToday } from '../prices/pricesSlice';
import { ShoppingCartState } from './shoppingCartState';

const initialState = {
  cart: {
    Items: []
  }
} as ShoppingCartState;

const saveToLC = (cart: ShoppingCart) => {
  const rawUserSession = localStorage.getItem(USERSESSION);
  if (rawUserSession) {
    let userSession = JSON.parse(rawUserSession) as UserSessionStorage;
    userSession = {
      ...userSession,
      cart
    };
    localStorage.setItem(USERSESSION, JSON.stringify(userSession));
  }
};
const getFromLC = (): ShoppingCart | null => {
  const rawUserSession = localStorage.getItem(USERSESSION);
  if (rawUserSession) {
    const userSession = JSON.parse(rawUserSession) as UserSessionStorage;
    if (userSession.cart) {
      return userSession.cart as ShoppingCart;
    } else {
      return null;
    }
  }
  return null;
};

const ShoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {
    removeAllItems: (state: ShoppingCartState) => {
      state.cart = {
        Items: []
      };
      saveToLC(state.cart);
    },
    removeCartItem: (state: ShoppingCartState, action: PayloadAction<string>) => {
      state.cart = {
        ...state.cart,
        Items: [...(state.cart.Items || [])].filter((i) => i.ProductId !== action.payload)
      };
      saveToLC(state.cart);
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
      saveToLC(state.cart);
    },
    addCartItem: (state: ShoppingCartState, action: PayloadAction<string>) => {
      const item = state.cart.Items.find((i) => i.ProductId === action.payload);
      if (item) {
        state.cart = {
          ...state.cart,
          Items: [...(state.cart.Items || [])].map((i) => {
            if (i.ProductId === action.payload) {
              i.Count = i.Count + 1;
            }
            return i;
          })
        };
      } else {
        state.cart = {
          ...state.cart,
          Items: [
            {
              ProductId: action.payload,
              Count: 1
            },
            ...(state.cart.Items || [])
          ]
        };
      }
      saveToLC(state.cart);
    },
    fetchCartItem: (state: ShoppingCartState) => {
      const cart = getFromLC();
      if (cart) {
        state.cart = {
          ...cart,
          Items: [...(cart.Items || [])]
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.cart = {
        Items: []
      };
      saveToLC(state.cart);
    });
  }
});

export const { removeCartItem, updateCartItemCount, addCartItem, fetchCartItem, removeAllItems } =
  ShoppingCartSlice.actions;

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
    prices: Price[] | undefined | null
  ): ShoppingCartList => {
    return plainToInstance(ShoppingCartList, {
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
        } as ShoppingCartListItem;
      })
    } as ShoppingCartList);
  }
);

export default ShoppingCartSlice.reducer;
