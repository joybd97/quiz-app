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
  const [title, setTitle] = useState(
    JSON.parse(localStorage?.getItem("title") || '""')
  );
  const [description, setDescription] = useState(
    JSON.parse(localStorage?.getItem("description") || '""')
  );


  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("description", JSON.stringify(description));
  }, [isLoggedIn, username, isAdmin, title, description]);

  // Context value to be shared
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    isAdmin,
    setIsAdmin,
    title,
    setTitle,
    description,
    setDescription,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
