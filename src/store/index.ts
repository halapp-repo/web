import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import citiesReducer from './cities/citiesSlice';
import inventoriesReducer from './inventories/inventoriesSlice';
import ordersReducer from './orders/ordersSlice';
import organizationsReducer from './organizations/organizationsSlice';
import pricesReducer from './prices/pricesSlice';
import productPricesReducer from './product-prices/productPricesSlice';
import shoppingCartReducer from './shopping-cart/shoppingCartSlice';
import uiReducer from './ui/uiSlice';
import usersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    inventories: inventoriesReducer,
    ui: uiReducer,
    productPrices: productPricesReducer,
    organizations: organizationsReducer,
    users: usersReducer,
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
    orders: ordersReducer,
    cities: citiesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
