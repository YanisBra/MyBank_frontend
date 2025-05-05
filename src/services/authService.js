import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/login_check", {
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
