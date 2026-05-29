import { createSlice } from "@reduxjs/toolkit";

// INITIAL STATE

const initialState = {
  user: null,

  token: localStorage.getItem("token") || null,

  isAuthenticated: false,

  loading: false,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // LOGIN SUCCESS

    loginSuccess: (state, action) => {
      state.user = action.payload.user;

      state.token = action.payload.token;

      state.isAuthenticated = true;

      // SAVE TOKEN IN LOCAL STORAGE

      localStorage.setItem("token", action.payload.token);
    },

    // LOGOUT

    logout: (state) => {
      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      // REMOVE TOKEN

      localStorage.removeItem("token");
    },
  },
});

// EXPORT ACTIONS

export const { loginSuccess, logout } = userSlice.actions;

// EXPORT REDUCER

export default userSlice.reducer;
