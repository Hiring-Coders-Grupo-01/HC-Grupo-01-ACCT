import axios from "axios";

const api = axios.create({
  baseURL: "https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/",
});

export default api;
