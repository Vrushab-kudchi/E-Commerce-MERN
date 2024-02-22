import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isMessage: "",
  products: [],
};

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (thunkAPI) => {
    try {
      return await productService.getProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "product/add WishList",
  async (data, thunkAPI) => {
    try {
      return await productService.addToWishList(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "added to wishlist";
        state.addToWishList = action.payload;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success in getting Single Product";
        state.productData = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      });
  },
});

export default productSlice.reducer;
