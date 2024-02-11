import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getCategory = async () => {
  const response = await axios.get(`${baseUrl}/category`);
  return response.data;
};

const createCategory = async (data) => {
  const response = await axios.post(`${baseUrl}/category`, data, config);
  return response.data;
};

const getACategory = async (id) => {
  const response = await axios.get(`${baseUrl}/category/${id}`);
  return response.data;
};

const updateCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}/category/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${baseUrl}/category/${id}`, config);
  return response.data;
};

const pCategoryService = {
  getCategory,
  createCategory,
  getACategory,
  updateCategory,
  deleteCategory,
};

export default pCategoryService;
