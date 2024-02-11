import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";

const initialState = {
  category: [],
  isLoading: false,
  isSucces: false,
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

export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (data, thunkAPI) => {
    try {
      return await pCategoryService.createCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACategory = createAsyncThunk(
  "category/singeCategory",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getACategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data, thunkAPI) => {
    try {
      return await pCategoryService.updateCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

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
        state.isSucces = true;
        state.category = action.payload;
        state.isError = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.createdCategory = action.payload;
        state.isError = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.categoryName = action.payload.title;
        state.isError = false;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.updatedCategory = action.payload;
        state.isError = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.deletedCategory = action.payload;
        state.isError = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
