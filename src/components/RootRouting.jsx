import React, { useContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Home from "./Home";
import LogIn from "./LogIn";
import Registration from "./Registration";
import AdminDashboard from "./AdminDashboard";
import QuizSet from "./QuizSet";
import QuizEntry from "./QuizEntry";
import QuizParticipation from "./QuizParticipation";
import QuizResult from "./QuizResult";
import LeaderBoard from "./LeaderBoard";

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

        <Route path="/quiz-set" element={<QuizSet />} />

        <Route path="/quiz-entry" element={<QuizEntry />} />

        <Route path="/quizzes/:quizId" element={<QuizParticipation/>}/>

        <Route path="/result" element={<QuizResult/>} />

        <Route path="/leader-board" element={<LeaderBoard/>}/>

      </Routes>
    </>
  );
};

export default RootRouting;
