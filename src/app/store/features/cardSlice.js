// store/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    
  },
});

export const { toggleDrawer, closeDrawer } = cartSlice.actions;
export default cartSlice.reducer;