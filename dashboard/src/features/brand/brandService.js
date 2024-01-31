import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getBrand = async () => {
  const response = await axios.get(`${baseUrl}/brand`);
  return response.data;
};

const brandService = {
  getBrand,
};

export default brandService;
