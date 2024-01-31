import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const getEnquiry = async () => {
  const response = await axios.get(`${baseUrl}/enquiry`);
  return response.data;
};

const enquiryService = {
  getEnquiry,
};

export default enquiryService;
