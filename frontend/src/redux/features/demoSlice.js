import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  data: [],
  loading: false,
  error: {},
};

export const getDemo = createAsyncThunk("/demo", async () => {
  try {
    let res = api.post("/demo");

    return (await res).data;
  } catch (error) {
    return error?.response?.data?.message;
  }
});

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getDemo.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getDemo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getDemo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
