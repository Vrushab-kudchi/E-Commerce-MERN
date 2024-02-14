import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getBlog = async () => {
  const response = await axios.get(`${baseUrl}/blog`);
  return response.data;
};

const createBlog = async (data) => {
  const response = await axios.post(`${baseUrl}/blog`, data, config);
  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${baseUrl}/blog/${id}`);
  return response.data;
};

const updateBlog = async (data) => {
  const response = await axios.put(`${baseUrl}/blog/${data._id}`, data, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlog,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
