import { createSlice } from "@reduxjs/toolkit";

// GET CART FROM LOCAL STORAGE

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// INITIAL STATE

const initialState = {
  cartItems: cartFromStorage,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ADD TO CART

    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // SAVE TO LOCAL STORAGE

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // INCREASE QUANTITY

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      // SAVE TO LOCAL STORAGE

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // DECREASE QUANTITY

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // SAVE TO LOCAL STORAGE

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // REMOVE FROM CART

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );

      // SAVE TO LOCAL STORAGE

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// EXPORT ACTIONS

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

// EXPORT REDUCER

export default cartSlice.reducer;
