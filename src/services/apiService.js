import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = async (email, password) => {
  return await axios.post(`${API_BASE_URL}/users/register`, { email, password });
};

export const loginUser = async (email, password) => {
  return await axios.post(`${API_BASE_URL}/users/login`, { email, password });
};
