import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addtoWishlist: (state, action) => {
      const ItemInWishList = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (!ItemInWishList) {
        state.wishlistItems.push({ ...action.payload });
      }
    },
    removewishlist: (state, action) => {
      const remove = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      state.wishlistItems = remove;
    },
    clearWishList: (state, action) => {
      state.wishlistItems = [];
    },
  },
});

export const { addtoWishlist, clearWishList, removewishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
