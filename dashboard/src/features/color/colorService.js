import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getColor = async () => {
  const response = await axios.get(`${baseUrl}/color`);
  return response.data;
};

const createColor = async (data) => {
  const response = await axios.post(`${baseUrl}/color`, data, config);
  return response.data;
};

const getAColor = async (id) => {
  const response = await axios.get(`${baseUrl}/color/${id}`);
  return response.data;
};

const updateColor = async (data) => {
  const response = await axios.put(
    `${baseUrl}/color/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${baseUrl}/color/${id}`, config);
  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getAColor,
  updateColor,
  deleteColor,
};

export default colorService;
