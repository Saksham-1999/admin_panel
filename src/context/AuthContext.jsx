import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedState = localStorage.getItem("isAuthenticated");
    console.log("++++", JSON.parse(savedState));
    return savedState ? JSON.parse(savedState) : false;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    console.log("2222222", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("333333333", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const login = (authToken, id) => {
    setIsAuthenticated(true);
    setToken(authToken);
    setUserId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setUserId("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const refreshAuthToken = async () => {
    // Implement token refresh logic here
    // E.g., call your API to get a new token
    try {
      const response = await fetch("your_refresh_token_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  useEffect(() => {
    // Optionally, set up a timer to refresh the token periodically
    const intervalId = setInterval(() => {
      if (isAuthenticated) {
        refreshAuthToken();
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);