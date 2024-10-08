import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, username } = response.data;

      // Store the token in local storage
      localStorage.setItem("token", token);
      setToken(token);
      setUser(username);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed"); // Propagate error
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
