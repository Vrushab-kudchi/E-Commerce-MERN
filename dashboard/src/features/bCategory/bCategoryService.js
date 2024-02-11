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

const bCategoryService = {
  getBlogCategory,
  createBlogCategory,
};

export default bCategoryService;
