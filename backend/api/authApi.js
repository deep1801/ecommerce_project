import api from "./axios";

// SIGNUP API

export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);

  return response.data;
};

// LOGIN API

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

// PROFILE API

export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return response.data;
};

// LOGOUT API

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
