import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/basket/getone", {
        withCredentials: true,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const addProduct = createAsyncThunk(
  "basket/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/basket/product/${data}/append`,
        {},
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

export const incrementProduct = createAsyncThunk(
  "basket/incrementProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/basket/product/${data}/increment`,
        {},
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

export const decrementProduct = createAsyncThunk(
  "basket/decrementProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/basket/product/${data}/decrement`,
        {},
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

const BasketPersistSlice = createSlice({
  name: "basket",
  initialState: {
    status: "",
    error: null,
    basket: {
      basketId: null,
      products: [],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.basket = {
          basketId: action.payload.id,
          products: action.payload.products,
        };
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(addProduct.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.basket.products = action.payload.products;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(incrementProduct.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(incrementProduct.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.basket.products = action.payload.products;
      })
      .addCase(incrementProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });

    builder
      .addCase(decrementProduct.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(decrementProduct.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.basket.products = action.payload.products;
      })
      .addCase(decrementProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });
  },
});

export default BasketPersistSlice.reducer;
