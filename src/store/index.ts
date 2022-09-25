import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './prices/pricesSlice';
import uiReducer from './ui/uiSlice'


const store = configureStore({
  reducer: {
    prices: pricesReducer,
    ui: uiReducer
  }
});

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch