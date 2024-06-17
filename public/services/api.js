import axios from "axios";

const api = axios.create({
  baseURL: import.env.VITE_API_URL,
});

export default api;
