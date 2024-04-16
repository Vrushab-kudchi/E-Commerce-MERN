import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getBrand = async () => {
  const response = await axios.get(`${baseUrl}/brand`);
  return response.data;
};

const createBrand = async (data) => {
  const response = await axios.post(`${baseUrl}/brand`, data, config);
  return response.data;
};

const getABrand = async (id) => {
  const response = await axios.get(`${baseUrl}/brand/${id}`);
  return response.data;
};

const updateBrand = async (data) => {
  const response = await axios.put(
    `${baseUrl}/brand/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${baseUrl}/brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrand,
  createBrand,
  getABrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
