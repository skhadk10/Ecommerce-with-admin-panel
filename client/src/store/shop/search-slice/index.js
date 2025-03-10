import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "/search/getSearchResults",
  async (keyword) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/search/${keyword}` // Backend endpoint
    );

    return result?.data;
  }
);
const SearchSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducer: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.searchResults = action.payload.success
            ? action.payload.data
            : []);
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        (state.isLoading = false), (state.searchResults = []);
      });
  },
});

export const { setProductDetails } = SearchSlice.actions;

export default SearchSlice.reducer;
