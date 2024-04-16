import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import config from "../../utils/axiosConfig";

const getProduct = async (data) => {
  console.log(data);
  const response = await axios.get(
    `${baseUrl}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.color ? `color=${data?.color}&&` : ""}${
      data?.category ? `category=${data?.category}&&` : ""
    }${data?.maxPrice ? `price[gte]=${data?.maxPrice}&&` : ""}${
      data?.minPrice ? `price[lte]=${data?.minPrice}&&` : ""
    }${data?.sort ? `sort=${data?.sort}&&` : ""}`
  );
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

const rateProduct = async (data) => {
  const response = await axios.put(`${baseUrl}product/rating`, data, config);
  return response.data;
};

const productService = {
  getProduct,
  getAProduct,
  addToWishList,
  rateProduct,
};

export default productService;
