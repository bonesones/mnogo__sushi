import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import error from "eslint-plugin-react/lib/util/error.js";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/logout",
        {},
        {
          withCredentials: true,
        },
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    error: null,
    user: {
      isAuthenticated: false,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.user.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.user.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
