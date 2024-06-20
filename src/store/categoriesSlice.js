import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../services/api.js";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/category/getall/`);
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  },
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    error: null,
    status: "",
    categories: [
      {
        id: null,
        name: "",
        isActive: false,
      },
    ],
  },
  reducers: {
    setActive: (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category.id !== action.payload) {
          return {
            ...category,
            isActive: false,
          };
        } else {
          return {
            ...category,
            isActive: true,
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.categories = action.payload.map(({ id, name }) => {
          return {
            id: id,
            name: name,
            isActive: false,
          };
        });
        if (state.categories.length == 0) {
          return;
        }
        if (!state.categories.some(({ isActive }) => isActive === true)) {
          state.categories[0].isActive = true;
        }
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.response?.data?.message;
      });
  },
});

export const { setActive } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
