import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getAllProducts = async () => {
  const response = await axios.get(`${baseUrl}/product`);
  return response.data;
};

const createProducts = async (data) => {
  const response = await axios.post(`${baseUrl}/product`,data, config);
  return response.data;
};

const productService = {
  getAllProducts,
  createProducts,
};

export default productService;
