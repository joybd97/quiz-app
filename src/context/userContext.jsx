import React, { createContext, useState, useEffect } from "react";

// Create the User Context
export const UserContext = createContext();

// Create the Provider Component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage?.getItem("isLoggedIn") || "false")
  );
  const [username, setUsername] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("username")) || {};
    } catch (error) {
      return {}; // Default to an empty object if parsing fails
    }
  });
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage?.getItem("isAdmin") || "false")
  );

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isLoggedIn]);

  // Context value to be shared
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    isAdmin,
    setIsAdmin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
