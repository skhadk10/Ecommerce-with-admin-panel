import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addnewProduct = createAsyncThunk(
  "/products/addnewProduct",
  async (formData) => {
    const result = await axios.post(
      " http://localhost:5000/api/admin/products/add", // Backend endpoint
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      " http://localhost:5000/api/admin/products/get" // Backend endpoint
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async (id, formData) => {
    const result = await axios.put(
      ` http://localhost:5000/api/admin/products/edit/${id}`, // Backend endpoint
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      ` http://localhost:5000/api/admin/products/delete/${id}` // Backend endpoint
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload.data); // Check this value, may just be 'data' directly
        state.isLoading = false;
        state.productList = action.payload.data; // Correctly update the product list
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
