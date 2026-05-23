import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_LOCAL_BACKEND;

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...userData, role: "user" }),
      });
      const message = await response.json();

      if (!response.ok) {
        return rejectWithValue(message?.message);
      }

      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data?.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.loading = false;
      });
  },
});

export default userSlice;
