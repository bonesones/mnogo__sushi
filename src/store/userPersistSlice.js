import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "userPersist/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
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
  "userPersist/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
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

export const registerUser = createAsyncThunk(
  "userPersist/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/user/signup",
        {
          email: data.email,
          phone: data.phone,
          password: data.password,
          submit_password: data.submit_password,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "userPersist/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/user/delete", {
        withCredentials: true,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const userPersistSlice = createSlice({
  name: "userPersist",
  initialState: {
    status: "",
    error: null,
    user: {
      isAuthenticated: false,
    },
  },
  reducers: {
    setIsAuthorized: (state, action) => {
      state.user.isAuthenticated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
        state.user.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
        state.user.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
        state.user.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });
  },
});

export const { setIsAuthorized, clearError } = userPersistSlice.actions;

export default userPersistSlice.reducer;
