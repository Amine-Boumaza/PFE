import axios from "axios";
import { createContext, useState, useEffect } from "react";

export  const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [CurrentUser, SetCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8081/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    SetCurrentUser(res.data);
  };
  const logout = () => {
    localStorage.removeItem("user");
    SetCurrentUser(null);
    window.location.href = "http://127.0.0.1:5500/index.html"; // Redirect to the desired URL
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(CurrentUser));
  }, [CurrentUser]);

  return (
    <AuthContext.Provider value={{ CurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};