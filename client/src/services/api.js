import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-application-2.onrender.com/api",
});

export default api;
