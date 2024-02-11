import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
};

export const getBlog = createAsyncThunk("blog/allBlog", async (thunkAPI) => {
  try {
    return await blogService.getBlog();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.blogs = null;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.blogs = null;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
