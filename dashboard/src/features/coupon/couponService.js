import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import config from "../../utils/axiosConfig";

const getCoupon = async () => {
  const response = await axios.get(`${baseUrl}/coupon`, config);
  return response.data;
};

const createCoupon = async (data) => {
  const response = await axios.post(`${baseUrl}/coupon`, data, config);
  return response.data;
};

const getACoupon = async (id) => {
  const response = await axios.get(`${baseUrl}/coupon/${id}`, config);
  return response.data;
};

const updateCoupon = async (data) => {
  const response = await axios.put(
    `${baseUrl}/coupon/${data._id}`,
    data,
    config
  );
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseUrl}/coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupon,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
