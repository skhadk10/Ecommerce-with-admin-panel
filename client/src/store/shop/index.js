import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filtersParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filtersParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}` // Backend endpoint
    );

    return result?.data;
  }
);
const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.productList = action.payload.success ? action.payload.data : []);
    });
    builder.addCase(fetchAllFilteredProducts.rejected, (state, action) => {
      (state.isLoading = false), (state.productList = []);
    });
  },
});

export default ShoppingProductSlice.reducer;
