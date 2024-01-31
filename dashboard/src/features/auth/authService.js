import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}/user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async (userData) => {
  const response = await axios.get(`${baseUrl}/user/all-orders`, config);
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;
