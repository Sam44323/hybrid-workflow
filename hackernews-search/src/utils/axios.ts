import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://hn.algolia.com/api/v1/",
});

export default axiosInstance;
