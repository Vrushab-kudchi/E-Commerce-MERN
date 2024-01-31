import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/user/all-users`);
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
