import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? `${API_URL}/api` : "/api",
  withCredentials: true,
});