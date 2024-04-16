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

const getOrder = async (id) => {
  const response = await axios.get(
    `${baseUrl}/user/getorderbyuser/${id}`,
    config
  );
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${baseUrl}/user/order/update-order/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  updateOrderStatus,
};

export default authService;
