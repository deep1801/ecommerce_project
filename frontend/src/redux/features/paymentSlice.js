import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: "",
};

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { savePaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
