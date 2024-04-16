import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config, { Imgconfig } from "../../utils/axiosConfig";

const uploadImage = async (data) => {
  const response = await axios.post(`${baseUrl}/upload`, data, Imgconfig);
  return response.data;
};

const deleteImage = async (public_id) => {
  const response = await axios.delete(
    `${baseUrl}/upload/delete-img/${public_id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImage,
  deleteImage,
};

export default uploadService;
