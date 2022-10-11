import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './prices/pricesSlice';
import inventoriesReducer from './inventories/inventoriesSlice';
import uiReducer from './ui/uiSlice';
import productPricesReducer from './product-prices/productPricesSlice';

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    inventories: inventoriesReducer,
    ui: uiReducer,
    productPrices: productPricesReducer
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
