import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { createOrder } = orderSlice.actions;

export default orderSlice.reducer;
