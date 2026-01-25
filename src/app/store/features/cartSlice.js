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
      const quantityToAdd = newItem.quantity ? newItem.quantity : 1;
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
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.salePrice);
      }
      // all over cart total quantity and amount
      state.totalQuantity += quantityToAdd;
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
    incrementQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem && quantity > 0) {
        // আগের কোয়ান্টিটি এবং নতুনের পার্থক্য বের করে টোটাল কোয়ান্টিটি আপডেট
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.salePrice * quantity;
        state.totalQuantity += quantityDifference;

        // টোটাল অ্যামাউন্ট আপডেট
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.salePrice * item.quantity,
          0,
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
