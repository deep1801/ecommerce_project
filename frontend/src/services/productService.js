import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products/get");

  return response.data;
};
export const createProduct = async (productData) => {
  const response = await api.post("/products/create", productData);

  return response.data;
};
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/update/${id}`, productData);

  return response.data;
};
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/delete/${id}`);

  return response.data;
};
