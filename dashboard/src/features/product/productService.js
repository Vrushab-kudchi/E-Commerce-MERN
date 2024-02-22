import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getAllProducts = async () => {
  const response = await axios.get(`${baseUrl}/product`);
  return response.data;
};

const createProducts = async (data) => {
  const response = await axios.post(`${baseUrl}/product`, data, config);
  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/product/${id}`, config);
  return response.data;
};

const updateProduct = async (data) => {
  const response = await axios.put(
    `${baseUrl}/product/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseUrl}/product/${id}`, config);
  return response.data;
};

const productService = {
  getAllProducts,
  createProducts,
  getAProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
