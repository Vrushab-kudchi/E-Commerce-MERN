import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
};

export const getColor = createAsyncThunk(
  "color/allColors",
  async (thunkAPI) => {
    try {
      return await colorService.getColor();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/createColor",
  async (data, thunkAPI) => {
    try {
      return await colorService.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAColor = createAsyncThunk(
  "Color/singeColor",
  async (id, thunkAPI) => {
    try {
      return await colorService.getAColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "Color/update",
  async (data, thunkAPI) => {
    try {
      return await colorService.updateColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "Color/delete",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.colors = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.colors = null;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.colorName = action.payload.title;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.colors = null;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.colors = null;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.deletedColor = action.payload;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.colors = null;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
