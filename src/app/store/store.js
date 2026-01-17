import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cardSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});