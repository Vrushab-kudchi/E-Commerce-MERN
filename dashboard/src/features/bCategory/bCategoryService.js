import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getBlogCategory = async () => {
  const response = await axios.get(`${baseUrl}/blogcategory`);
  return response.data;
};

const createBlogCategory = async (data) => {
  const response = await axios.post(`${baseUrl}/blogcategory`, data, config);
  return response.data;
};

const getABlogCategory = async (id) => {
  const response = await axios.get(`${baseUrl}/blogcategory/${id}`);
  return response.data;
};

const updateBlogCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}/blogcategory/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${baseUrl}/blogcategory/${id}`, config);
  return response.data;
};

const bCategoryService = {
  getBlogCategory,
  createBlogCategory,
  getABlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
