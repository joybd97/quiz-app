import React, { useState, useEffect, useContext } from "react";

import { adminQuizzes } from "../api/quizzes/Get";
import { useNavigate } from "react-router-dom";
import AdminLeftPanel from "./common/AdminLeftPanel";
import QuizzesHeader from "./quezzes/QuizzesHeader";
import SingleQuiz from "./quezzes/SingleQuiz";
import EmptyItem from "./common/EmptyItem";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/quiz-set");
  };



  useEffect(() => {
    // Fetch quiz data from the API
    adminQuizzes().then((response) => {
      //console.log(response);
      if (response[0]?.data) {
        setQuizzes(response[0]?.data);
      } else {
        console.log(response?.[1]);
      }
    });
  }, [quizzes]);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <AdminLeftPanel />

      {/* Main Content */}
      <main className="flex-grow p-10 text-left">
        <QuizzesHeader />

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


          {/* CREATE NEW QUIZ */}
          <div onClick={handleRedirect} className="group cursor-pointer">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                Create a new quiz
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                Build from the ground up
              </p>
            </div>
          </div>

          {/* CREATED QUIZ LIST */}
          {quizzes?.length > 0 ?

            quizzes.map((quiz, quizIndex) => (
              <SingleQuiz
                key={`Quiz-${quizIndex}`}
                quiz={quiz} />
            ))
            :
            <EmptyItem
              headerMessage={'No Quiz found.'}
              detailsMessage={'Add new quiz to see quiz list'}
            />

          }
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
