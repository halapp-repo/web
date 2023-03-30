import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './prices/pricesSlice';
import inventoriesReducer from './inventories/inventoriesSlice';
import profileReducer from './profile/profileSlice';
import uiReducer from './ui/uiSlice';
import productPricesReducer from './product-prices/productPricesSlice';
import organizationsReducer from './organizations/organizationsSlice';
import authReducer from './auth/authSlice';
import shoppingCartReducer from './shopping-cart/shoppingCartSlice';
import ordersReducer from './orders/ordersSlice';
import usersReducer from './users/usersSlice';
import citiesReducer from './cities/citiesSlice';

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    inventories: inventoriesReducer,
    ui: uiReducer,
    profile: profileReducer,
    productPrices: productPricesReducer,
    organizations: organizationsReducer,
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
    orders: ordersReducer,
    users: usersReducer,
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
