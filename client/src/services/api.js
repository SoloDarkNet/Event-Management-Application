import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-application-frontend.onrender.com/api",
});

export default api;
