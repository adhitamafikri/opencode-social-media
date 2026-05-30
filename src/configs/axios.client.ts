import axios from "axios";
import { API_BASE_URL } from "@/configs/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent if needed
    return config;
  },
  (error) => {
    // Do something with response error if needed
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    // Do something with response data if needed
    return response;
  },
  (error) => {
    // Do something with response error if needed
    return Promise.reject(error);
  },
);

export { apiClient };
