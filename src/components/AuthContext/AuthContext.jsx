import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ngoPassword, setNgoPassword] = useState(
    localStorage.getItem("ngoPassword") || "ngopass123" // Default password
  );

  useEffect(() => {
    // Check if user is logged in on app load
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    if (isAuthenticated && userRole) {
      setUser({ role: userRole });
    }
  }, []);

  const login = (email, password, role) => {
    if (role === "ngo" && password !== ngoPassword) {
      return { error: "Invalid NGO password" };
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    setUser({ email, role });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  const updateNgoPassword = (newPassword) => {
    setNgoPassword(newPassword);
    localStorage.setItem("ngoPassword", newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        ngoPassword,
        updateNgoPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
