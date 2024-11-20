import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/userContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, setIsLoggedIn, setUsername, setIsAdmin } =
    useContext(UserContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setUsername("");
    localStorage.removeItem("username");
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("authToken");
  };

  return (
    <div className="container mx-auto py-3" style={{ fontFamily: "Jaro" }}>
      <nav className="flex justify-between items-center mb-12">
        {/* Logo */}
        <img src={logo} className="h-7" alt="Logo" />

        {/* Right-side buttons */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              >
                Logout
              </button>
              {/* Admin Button */}
              {isAdmin && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                >
                  Admin Dashboard
                </button>
              )}
            </>
          ) : (
            // Login Button
            <button
              onClick={() => navigate("/log-in")}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};
