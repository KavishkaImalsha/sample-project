import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_LOCAL_BACKEND;
export const addProduct = createAsyncThunk(
  "product/add",
  async ({ productDetails, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productDetails),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      rejectWithValue(error?.message);
    }
  },
);

export const getProducts = createAsyncThunk(
  "products/get",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (barcode, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/product/${barcode}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const message = await response.json();

      if (!response.ok) {
        return rejectWithValue(message);
      }

      return message;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ product, barcode }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/product/${barcode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
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
    selectProduct: null,
  },
  reducers: {
    setSelectProduct(state, action) {
      state.selectProduct = action.payload;
    },

    clearSelectProduct(state, action) {
      state.selectProduct = null;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload?.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.barcode != action.payload.barcode,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        ((state.loading = false),
          (state.error =
            action.payload?.message || action.payload || "Error occured"));
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.selectProduct = null;
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.barcode === action.payload.product.barcode,
        );

        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const actions = productSlice.actions;

export default productSlice;
