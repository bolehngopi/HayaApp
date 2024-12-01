import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session_id = localStorage.getItem("cred");
    if (session_id) {
      setSession({ session_id });
    }
    setLoading(false);
  }, []);

  /**
   * Login a user
   */
  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const token = response.data.token;

      if (response.status === 201) {
        localStorage.setItem("cred", response.data.user.id);
        localStorage.setItem("token", token);
        setSession(response.data.user);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Register a user
   */
  const register = async (name, email, password) => {
    try {
      const response = await apiClient.post("/auth/register", { name, email, password });

      if (response.status === 201) {
        console.log("User registered successfully");
      } else {
        console.log("Error registering user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Logout a user
   */
  const logout = async () => {
    try {
      await apiClient.post("/logout");

      localStorage.removeItem("token");
      setSession({});
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AuthContext.Provider value={{ session, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};