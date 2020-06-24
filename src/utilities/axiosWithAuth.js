import axios from "axios";
require("dotenv").config();

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  // retrieve API base url from .env
  const apiUrl = "http://localhost:9000";
  console.log(apiUrl);
  return axios.create({
    // sets base url, and authorization headers with each axios request
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
};

export default axiosWithAuth;
