import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isLoading: false,
  isSucces: false,
  isError: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
  "products/createProducts",
  async (data, thunkAPI) => {
    try {
      return await productService.createProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const productSlice = createSlice({
  name: productService,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSucces = true;
        state.products = action.payload;
        state.message = "Success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSucces = false;
        state.products = null;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
