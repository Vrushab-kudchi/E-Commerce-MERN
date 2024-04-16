import baseUrl from "../../utils/baseUrl";
import axios from "axios";

const getAllBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog`);
  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${baseUrl}blog/${id}`);
  return response.data;
};

const blogService = {
  getAllBlogs,
  getABlog,
};

export default blogService;
