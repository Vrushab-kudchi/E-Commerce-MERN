import baseUrl from "../../utils/baseUrl";
import axios from "axios";

const createEnquiry = async (data) => {
  const response = await axios.post(`${baseUrl}enquiry`, data);
  return response.data;
};

const contactService = {
  createEnquiry,
};

export default contactService;
