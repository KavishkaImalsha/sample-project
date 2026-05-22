import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const addProduct = createAsyncThunk(
  "product/add",
  async ({ productDetails, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productDetails),
      });
      const message = await response.json();
      return message;
    } catch (error) {
      rejectWithValue(error?.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
  },
  extraReducers: (builders) => {
    builders
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default productSlice;
