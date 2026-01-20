import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  cartItems: [],
};

export const cartDrawerSlice = createSlice({
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

export const { toggleDrawer, closeDrawer } = cartDrawerSlice.actions;
export default cartDrawerSlice.reducer;