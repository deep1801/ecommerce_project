import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// REQUEST INTERCEPTOR

api.interceptors.request.use(
  (config) => {
    // GET TOKEN

    const token = localStorage.getItem("token");

    // ADD TOKEN IN HEADERS

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default api;
