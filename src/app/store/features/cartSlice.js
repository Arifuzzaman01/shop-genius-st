const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id,
      );
      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.salePrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.salePrice);
      }
      // all over cart total quantity and amount
      state.totalQuantity++;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.salePrice * item.quantity,
        0,
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantity -= existingItem.quantity;
      }

      // all over cart total amount
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.salePrice * item.quantity,
        0,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
