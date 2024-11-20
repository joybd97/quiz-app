import React, { useState, useEffect } from "react";
import axios from "axios";
import avater from "../assets/avater.webp"

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quiz data from the API
    axios
      .get("http://localhost:5000/api/admin/quizzes") // Replace with your API endpoint
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary p-6 flex flex-col">
        <div className="mb-10">
          <img src="../assets/logo-white.svg" alt="Logo" className="h-7" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
              >
                Quizzes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Users
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Roles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center">
          <img
            src={avater}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">Saad Hasan</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
          <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
        </header>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="./quiz_set_page.html" className="group">
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
          </a>

          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
            >
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                  <path d="M12 12l4 -2.25l4 -2.25" />
                  <path d="M12 12l0 9" />
                  <path d="M12 12l-4 -2.25l-4 -2.25" />
                  <path d="M20 12l-4 2v4.75" />
                  <path d="M4 12l4 2l0 4.75" />
                  <path d="M8 5.25l4 2.25l4 -2.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                {quiz.title}
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                {quiz.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
