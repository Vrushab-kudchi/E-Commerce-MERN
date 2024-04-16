import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";

const initialState = {
  category: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
};

export const getBlogCategory = createAsyncThunk(
  "blog/allCategory",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blog/createCategory",
  async (data, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCategory = createAsyncThunk(
  "BlogCategory/singeBlogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getABlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "BlogCategory/update",
  async (data, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "BlogCategory/delete",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const bCategorySlice = createSlice({
  name: "bCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.category = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.category = null;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.createdCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.categoryName = action.payload.title;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.updatedCategory = action.payload;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.deletedCategory = action.payload;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCategorySlice.reducer;
