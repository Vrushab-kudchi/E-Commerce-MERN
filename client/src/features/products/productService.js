import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import config from "../../utils/axiosConfig";

const getProduct = async () => {
  const response = await axios.get(`${baseUrl}product`);
  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(`${baseUrl}product/${id}`);
  return response.data;
};

const addToWishList = async (productId) => {
  const response = await axios.put(
    `${baseUrl}product/wishlist`,
    { productId },
    config
  );
  return response.data;
};

const productService = {
  getProduct,
  getAProduct,
  addToWishList,
};

export default productService;
