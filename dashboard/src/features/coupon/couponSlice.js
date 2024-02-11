import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
};

export const getCoupon = createAsyncThunk(
  "brand/allBrand",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupon();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "products/createBrand",
  async (data, thunkAPI) => {
    try {
      return await couponService.createCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resetAll");

const couponSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.coupons = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.coupons = null;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.message = "Success";
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.error;
        state.coupons = null;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
