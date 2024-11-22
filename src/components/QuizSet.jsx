import React, { useContext, useState } from "react";
import logo from "../assets/logo-white.svg";
import { UserContext } from "../context/userContext";
import Avatar from "react-avatar";
import { createQuiz } from "../api/quizzes/Post";
import { useNavigate } from "react-router-dom";

const QuizSet = () => {
  const { username, title, setTitle, description, setDescription } =
    useContext(UserContext);
  const navigate = useNavigate();
  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("authToken"); // Retrieve token from storage

    try {
      const response = await createQuiz({ title, description }, token);
      console.log(response.data.id);
      localStorage.setItem("id", response.data.id);
      setSuccessMessage("Quiz created successfully!");
      navigate("/quiz-entry");
      console.log("Quiz Response:", response);
    } catch (error) {
      setErrorMessage("Failed to create quiz. Please try again.");
      console.error("Quiz Creation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen flex text-left">
      {/* Sidebar */}
      <aside className="hidden md:w-64 bg-primary p-6 md:flex flex-col">
        <div className="mb-10">
          <img src={logo} alt="Logo" className="h-7" />
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
          <Avatar
            name={username}
            size="40"
            round={true}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">{username}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Give your quiz title and description
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="quiz-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quiz title*
                </label>
                <input
                  type="text"
                  id="quiz-title"
                  name="quiz-title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="quiz-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="quiz-description"
                  name="quiz-description"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Next"}
              </button>
            </form>

            {successMessage && (
              <p className="mt-4 text-green-500 font-semibold">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizSet;
