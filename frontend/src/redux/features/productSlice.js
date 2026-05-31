import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      _id: "1",
      title: "iPhone 15",
      price: 120000,
      stock: 5,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },

    {
      _id: "2",
      title: "Samsung S24",
      price: 95000,
      stock: 10,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },

    {
      _id: "3",
      title: "Gaming Mouse",
      price: 3500,
      stock: 20,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
  ],
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},
});

export default productSlice.reducer;
