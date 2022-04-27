import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://shipshop-api.herokuapp.com/",
});
