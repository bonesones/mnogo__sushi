import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserOrders = createAsyncThunk(
  "user_orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/user/getall`, {
        withCredentials: true,
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  },
);

export const createOrder = createAsyncThunk(
  "user_orders/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/order/user/create`,
        {
          ...data,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  },
);

const userOrderSlice = createSlice({
  name: "orders",
  initialState: {
    error: null,
    status: "",
    orders: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.orders = action.payload;
        state.orders.sort(({ id: prevId }, {id: nextId}) => nextId - prevId)
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });
  },
});

export default userOrderSlice.reducer;
