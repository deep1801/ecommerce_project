import { createSlice } from "@reduxjs/toolkit";

// LOCAL STORAGE

const shippingFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    };

// INITIAL STATE

const initialState = {
  shippingInfo: shippingFromStorage,
};

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;

      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
  },
});

export const { saveShippingInfo } = checkoutSlice.actions;

export default checkoutSlice.reducer;
