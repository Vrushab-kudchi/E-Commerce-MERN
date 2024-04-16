import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import contactService from "./contactService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isMessage: "",
};

export const createAEnquiry = createAsyncThunk(
  "Contact/CreateEnqiury",
  async (data, thunkAPI) => {
    try {
      return await contactService.createEnquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAEnquiry.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        if (state.isSuccess) {
          toast.success("Enquiry Has Been Successfully Sent");
        }
      })
      .addCase(createAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      });
  },
});

export default contactSlice.reducer;
