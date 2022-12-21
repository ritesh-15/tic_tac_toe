import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, {
        withCredentials: true,
      });
      return api.request(originalRequest);
    }
    throw error;
  }
);

export default api;
