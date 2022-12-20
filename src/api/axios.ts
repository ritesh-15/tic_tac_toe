import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

export default api;
