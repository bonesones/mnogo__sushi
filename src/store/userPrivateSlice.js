import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../services/api.js";

export const getUserInfo = createAsyncThunk(
  "userPrivate/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/getuser", {
        withCredentials: true,
      });
      return response.data?.user;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  "userPrivate/updateUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/api/user/update",
        {
          email: data.email,
          phone: data.phone,
          password: data.password,
          name: data.name.trim(),
          birthday: data.birthday,
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

const userPrivateSlice = createSlice({
  name: "userPrivate",
  initialState: {
    error: null,
    status: "",
    user: {
      personal: {
        name: "",
        phone: "",
        email: "",
        birthday: "",
      },
    },
    orders: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.user.personal.name = action.payload.name;
        state.user.personal.phone = action.payload.phone;
        state.user.personal.email = action.payload.email;
        state.user.personal.birthday = action.payload.birthday;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.user.personal.name =
          action.payload.name ?? state.user.personal.name;
        state.user.personal.phone =
          action.payload.phone ?? state.user.personal.phone;
        state.user.personal.email =
          action.payload.email ?? state.user.personal.email;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });
  },
});

export default userPrivateSlice.reducer;
