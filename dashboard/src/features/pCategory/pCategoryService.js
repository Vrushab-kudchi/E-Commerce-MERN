import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getCategory = async () => {
  const response = await axios.get(`${baseUrl}/category`);
  return response.data;
};

const pCategoryService = {
  getCategory,
};

export default pCategoryService;
