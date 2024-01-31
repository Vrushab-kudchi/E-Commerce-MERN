import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getColor = async () => {
  const response = await axios.get(`${baseUrl}/color`);
  return response.data;
};

const colorService = {
  getColor,
};

export default colorService;
