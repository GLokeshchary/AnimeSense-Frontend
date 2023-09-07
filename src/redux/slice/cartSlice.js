import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    buyNowItems: {},
  },
  reducers: {
    addtoCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload
      );
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = removeItem;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    buyNowItem: (state, action) => {
      state.buyNowItems = { ...action.payload };
    },
  },
});

export const {
  addtoCart,
  buyNowItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
