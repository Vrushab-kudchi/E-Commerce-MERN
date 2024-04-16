import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "sonner";

const getUserFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const getUserDataFromLocalStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isMessage: "",
  user: getUserFromLocalStorage,
  userData: getUserDataFromLocalStorage,
  totalAmount: 0,
};

export const registerUser = createAsyncThunk(
  "user/Register",
  async (data, thunkAPI) => {
    try {
      return await userService.registerUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/Login",
  async (data, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/get-Info",
  async (thunkAPI) => {
    try {
      return await userService.getUserInfo(getUserFromLocalStorage._id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "user/get-wishlist",
  async (thunkAPI) => {
    try {
      return await userService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/add-To-Cart",
  async (data, thunkAPI) => {
    try {
      return await userService.addToCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/get-User-Cart",
  async (thunkAPI) => {
    try {
      return await userService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSingleCart = createAsyncThunk(
  "user/delete-Single-Cart",
  async (cartItemId, thunkAPI) => {
    try {
      return await userService.deleteSingleCart(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateSingleCart = createAsyncThunk(
  "user/update-Single-Cart",
  async (data, thunkAPI) => {
    try {
      return await userService.updateSingleCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (data, thunkAPI) => {
    try {
      return await userService.createOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "user/get-Orders",
  async (thunkAPI) => {
    try {
      return await userService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update-User",
  async (data, thunkAPI) => {
    try {
      return await userService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "user/forgot-password-token",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await userService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        if (state.isSuccess) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
        if (state.isError) {
          toast.error("User Already Exists");
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isMessage = "Success";
        if (state.isSuccess) {
          toast.success("Login Successfull");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
        if (state.isError) {
          toast.error("Email or Password is Incorrect");
        }
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.isMessage = "Success";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userWishlist = action.payload.wishlist;
        state.isMessage = "Success";
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.isMessage = "Success";
        if (state.isSuccess) {
          toast.success("Product Added to Cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartData = action.payload;
        state.isMessage = "Success";
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(deleteSingleCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteSingleCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        if (state.isSuccess) {
          toast.success("Product Deleted From Cart");
        }
      })
      .addCase(deleteSingleCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      })
      .addCase(updateSingleCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateSingleCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
      })
      .addCase(updateSingleCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.ordered = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered Successfully");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.getOrderedProducts = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.updatedUser = action.payload;
        if (state.isSuccess) {
          toast.success("User Info Updated");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
        if (state.isError) {
          toast.error("There was a problem updating Please Try Again Later");
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.token = action.payload;
        if (state.isSuccess) {
          toast.success("Email has been sent successfully!");
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
        if (state.isError) {
          toast.error("Something went Wrong");
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "Success";
        state.resetPassword = action.payload;
        if (state.isSuccess) {
          toast.success("Password has been changed successfully!");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.error;
        if (state.isError) {
          toast.error("Something went Wrong");
        }
      });
  },
});

export const { setTotalAmount } = authSlice.actions;
export default authSlice.reducer;
