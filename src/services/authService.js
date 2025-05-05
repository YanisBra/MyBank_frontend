import axios from "axios";

const AUTH_API_URL = "http://localhost:8000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${AUTH_API_URL}/login_check`, {
    email,
    password,
  });

  const token = response.data.token;
  localStorage.setItem("token", token);

  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
