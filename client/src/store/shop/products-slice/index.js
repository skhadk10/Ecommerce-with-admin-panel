import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
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

export const fecthProductDetails = createAsyncThunk(
  "/products/fecthProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}` // Backend endpoint
    );

    return result?.data;
  }
);
const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducer: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.productList = action.payload.success
            ? action.payload.data
            : []);
      })
      .addCase(fecthProductDetails.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      })
      .addCase(fecthProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fecthProductDetails.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.productDetails = action.payload.success
            ? action.payload.data
            : null);
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productDetails = null);
      });
  },
});

export const { setProductDetails } = ShoppingProductSlice.actions;

export default ShoppingProductSlice.reducer;
