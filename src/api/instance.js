import axios from "axios";

// const BASE_URL = "http://localhost:3001";
// const BASE_URL = "/api";
const BASE_URL = "https://hey-rides.onrender.com";
// const BASE_URL = "https://www.heyrides.ca/api";

export default axios.create({
  baseURL: BASE_URL,
});
