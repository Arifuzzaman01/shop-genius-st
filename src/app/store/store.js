import { configureStore } from "@reduxjs/toolkit";
import cartDrawerReducer from "./features/cartDrawerSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cartDrawer: cartDrawerReducer,
    cart: cartReducer,
  },
});
