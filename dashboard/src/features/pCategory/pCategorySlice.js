import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";

const initialState = {
  category: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getCategory = createAsyncThunk(
  "product/allCategory",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const pCategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        state.isError = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default pCategorySlice.reducer;
