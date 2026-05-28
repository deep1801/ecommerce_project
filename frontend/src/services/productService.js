import api from "./api";

// GET ALL PRODUCTS

export const getProducts = async () => {
  const response = await api.get("/products/get");

  return response.data;
};

// GET SINGLE PRODUCT

export const getSingleProduct = async (id) => {
  const response = await api.get(`/products/get/${id}`);

  return response.data;
};
