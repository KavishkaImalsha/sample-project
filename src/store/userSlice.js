import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const message = await response.json();
      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    token: null,
    isLoggedIn: false,
    error: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(registerUser.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload._id;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload._id);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export default userSlice;
