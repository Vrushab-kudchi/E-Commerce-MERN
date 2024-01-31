import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getBlog = async () => {
  const response = await axios.get(`${baseUrl}/blog`);
  return response.data;
};

const blogService = {
  getBlog,
};

export default blogService;
