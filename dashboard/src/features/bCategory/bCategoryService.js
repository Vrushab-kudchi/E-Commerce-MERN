import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getBlogCategory = async () => {
  const response = await axios.get(`${baseUrl}/blogcategory`);
  return response.data;
};

const bCategoryService = {
  getBlogCategory,
};

export default bCategoryService;
