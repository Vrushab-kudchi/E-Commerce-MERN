const TokenData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${TokenData === null ? null : TokenData.token}`,
    accept: "application/json",
  },
};

export const Imgconfig = {
  headers: {
    Authorization: `Bearer ${TokenData === null ? null : TokenData.token}`,
    "Content-Type": "multipart/form-data",
  },
};

export default config;
