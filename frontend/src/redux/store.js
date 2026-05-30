import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartSlice";

import userReducer from "./features/userSlice";

import shippingReducer from "./features/shippingSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    user: userReducer,

    shipping: shippingReducer,
  },
});
