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

const blogService = {
  getBlog,
  createBlog,
};

export default blogService;
