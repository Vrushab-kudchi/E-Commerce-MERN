import config from "../../utils/axiosConfig";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";

const registerUser = async (data) => {
  const response = await axios.post(`${baseUrl}user/register`, data);
  return response.data;
};

const loginUser = async (data) => {
  const response = await axios.post(`${baseUrl}user/login`, data);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserInfo = async (id) => {
  const response = await axios.get(`${baseUrl}user/${id}`, config);
  if (response.data) {
    localStorage.setItem("userData", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(`${baseUrl}user/wishlist`, config);
  return response.data;
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${baseUrl}user/cart`, cartData, config);
  return response.data;
};

const getCart = async () => {
  const response = await axios.get(`${baseUrl}user/cart`, config);
  return response.data;
};

const deleteSingleCart = async (cartItemId) => {
  const response = await axios.delete(
    `${baseUrl}user/delete-product-cart/${cartItemId}`,
    config
  );
  return response.data;
};

const updateSingleCart = async (data) => {
  const response = await axios.put(
    `${baseUrl}user/update-product-cart/${data.id}/${parseInt(data.quantity)}`,
    {},
    config
  );
  return response.data;
};

const userService = {
  registerUser,
  loginUser,
  getUserInfo,
  getUserWishlist,
  addToCart,
  getCart,
  deleteSingleCart,
  updateSingleCart,
};

export default userService;
