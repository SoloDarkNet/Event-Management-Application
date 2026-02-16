import axios from "axios";

const api = axios.create({
  baseURL: "https://events-management-application.onrender.com/api",
});

export default api;
