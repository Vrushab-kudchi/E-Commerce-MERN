import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
};

export const getBrand = createAsyncThunk("brand/allBrand", async (thunkAPI) => {
  try {
    return await brandService.getBrand();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBrand = createAsyncThunk(
  "products/createBrand",
  async (data, thunkAPI) => {
    try {
      return await brandService.createBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABrand = createAsyncThunk(
  "brand/singeBrand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getABrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update",
  async (data, thunkAPI) => {
    try {
      return await brandService.updateBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.brands = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.brands = null;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.brands = null;
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.brandName = action.payload.title;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.brands = null;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.brands = null;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.brands = null;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
