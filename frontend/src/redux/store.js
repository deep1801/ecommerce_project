import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartSlice";

import userReducer from "./features/userSlice";

import shippingReducer from "./features/shippingSlice";
import paymentReducer from "./features/paymentSlice";
import orderReducer from "./features/orderSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    user: userReducer,

    shipping: shippingReducer,
    payment: paymentReducer,
    order: orderReducer,
    product: productReducer,
  },
});
