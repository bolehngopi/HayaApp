import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    // Initialize session data from localStorage
    const storedSession = localStorage.getItem("session");
    return storedSession ? JSON.parse(storedSession) : { isAdmin: false, auth: false };
  });

  const [user, setUser] = useState(null); // Store user data separately
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the token from localStorage if it exists
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      fetchUserData(token); // Fetch user data if the token is available
    } else {
      setLoading(false); // Set loading to false if no token exists
    }
  }, [token]);

  useEffect(() => {
    // Synchronize session with localStorage
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  /**
   * Fetch user data using the stored token
   */
  const fetchUserData = async (token) => {
    try {
      const response = await apiClient.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData = response.data.data;
        setUser(userData);
        setSession((prevSession) => ({
          ...prevSession,
          auth: true,
          isAdmin: userData.role.name === "admin", // Check if user is admin
        }));
        setError(null);
      } else {
        setError("Unable to fetch user data.");
        logout(); // Clear session on failed fetch
      }
    } catch (error) {
      setError("Error fetching user data.");
      logout(); // Handle failed token
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login a user
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, session_id, user } = response.data;

      if (response.status === 201) {
        // Set the token in localStorage
        localStorage.setItem("token", token);

        setToken(token); // Update token state
        setSession({
          session_id,
          isAdmin: user.role.name === "admin", // Check if user is admin
          auth: true,
        });
        setUser(user);
        setError(null);
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a user
   */
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/register", { name, email, password });

      if (response.status === 201) {
        setError(null);
        console.log("User registered successfully");
      } else {
        setError("Error registering user. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout a user
   */
  const logout = async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem("token"); // Remove token from localStorage
      setToken(null); // Reset token state
      setSession({ isAdmin: false, auth: false }); // Reset session state
      setUser(null);
    } catch (error) {
      setToken(null);
      setSession({ isAdmin: false, auth: false });
      setUser(null);
      setError("An error occurred during logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
