import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getEnquiry = async () => {
  const response = await axios.get(`${baseUrl}/enquiry`);
  return response.data;
};

const getAEnquiry = async (id) => {
  const response = await axios.get(`${baseUrl}/enquiry/${id}`, config);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${baseUrl}/enquiry/${id}`, config);
  return response.data;
};

const updateEnquiry = async (data) => {
  const response = await axios.put(
    `${baseUrl}/enquiry/${data?.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiry,
  getAEnquiry,
  deleteEnquiry,
  updateEnquiry,
};

export default enquiryService;
