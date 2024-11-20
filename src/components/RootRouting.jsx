import React, { useContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Home from "./Home";
import LogIn from "./LogIn";
import Registration from "./Registration";
import AdminDashboard from "./AdminDashboard";

const RootRouting = () => {
  const { isLoggedIn, setIsLoggedIn, username, isAdmin } =
    useContext(UserContext);

  //console.log(isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* console.log(isLoggedIn) */}
        <Route
          path="/log-in"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LogIn />}
        />

        <Route path="/register" element={<Registration />} />

        <Route
          path="/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

export default RootRouting;
