import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const CreateNewOrder = createAsyncThunk(
  "order/createNewOrder",

  async (orderData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/order/create`,
      orderData
    );
    return response.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",

  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",

  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",

  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(CreateNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});
export default shoppingOrderSlice.reducer;
