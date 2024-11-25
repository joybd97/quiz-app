import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { createQuiz } from "../api/quizzes/Post";
import { useNavigate } from "react-router-dom";
import AdminLeftPanel from "./common/AdminLeftPanel";
import { QuizSetCreate } from "./quizset/QuizSetCreate";

const QuizSet = () => {
  const {title, setTitle, description, setDescription } =
    useContext(UserContext);
  const navigate = useNavigate();

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
      //console.log(response[0]?.data?.id);
      localStorage.setItem("id", response[0].data?.id);
      setSuccessMessage("Quiz created successfully!");
      navigate("/quiz-entry");
      //console.log("Quiz Response:", response);
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
      <AdminLeftPanel />

      {/* Main Content */}
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          {/* quiz set component */}
          <QuizSetCreate 
          handleSubmit={handleSubmit} 
          title={title} 
          setTitle={setTitle}
          description={description}
          setDescription={setDescription} 
          loading={loading} 
          successMessage={successMessage}
          errorMessage={errorMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default QuizSet;
