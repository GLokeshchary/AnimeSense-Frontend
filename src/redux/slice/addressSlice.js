import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;
