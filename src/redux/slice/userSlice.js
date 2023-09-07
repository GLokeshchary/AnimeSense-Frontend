import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  LoggedIn: false,
  AdminLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.LoggedIn = true;
      if (action.payload.userRole === "ADMIN") {
        state.AdminLoggedIn = true;
      }
    },
    logout: (state) => {
      state.LoggedIn = false;
      state.AdminLoggedIn = false;
      state.user = null;
    },
  },
});

export const { addUser, logout } = userSlice.actions;

export default userSlice.reducer;
