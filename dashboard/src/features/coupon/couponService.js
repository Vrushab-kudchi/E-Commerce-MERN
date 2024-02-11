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

const couponService = {
  getCoupon,
  createCoupon,
};

export default couponService;
