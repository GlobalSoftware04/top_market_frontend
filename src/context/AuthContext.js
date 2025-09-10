import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/axios";  // ✅ now this is a singleton axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken") || null);
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authUserInfo = async () => {
    try {
      const response = await api.post("/authDetails", {});
      if (response.data.success) {
        setAuthUser(response.data.user);
        return response.data.user;
      } else {
        setAuthUser(null);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setAuthUser(null);
      return null;
    }
  };

  const IsAuthenticateUser = async () => {
    if (!authToken) {
      setAuthUser(null);
      setIsAuthenticated(false);
      return false;
    }

    if (!authUser) await authUserInfo();
    const isValid = await verifyToken(authToken);
    setIsAuthenticated(isValid);
    return isValid;
  };

  const verifyToken = async (token) => {
    try {
      const response = await api.post("/verifyToken", { token });
      return response.status === 200;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (authToken) {
      IsAuthenticateUser();
    } else {
      setIsAuthenticated(false);
      setAuthUser(null);
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = async () => {
    try {
      await api.post("/logout", {action_by : authUser.Code});
    } catch (err) {
      console.warn("Logout failed:", err);
    }
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        isAuthenticated,
        login,
        logout,
        IsAuthenticateUser,
        authUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
