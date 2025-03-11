import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/review/addProductReview",
  async (formdata) => {
    const result = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
       formdata
    );

    return result?.data;
  }
);

export const getReview = createAsyncThunk(
  "/review/getProductReview",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/review/get/${id}` // Backend endpoint
    );

    return result?.data;
  }
);
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviews = action.payload.data);
      })

      .addCase(getReview.rejected, (state) => {
        (state.isLoading = false), (state.reviews = []);
      });
  },
});

export const { setProductDetails } = reviewSlice.actions;

export default reviewSlice.reducer;
