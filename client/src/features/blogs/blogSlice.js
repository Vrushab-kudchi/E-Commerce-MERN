import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isMessage: "",
  blogs: [],
};

export const getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blog/get-Single-Blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.blogData = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      });
  },
});

export default blogSlice.reducer;
