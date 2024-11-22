import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo-white.svg";
import { UserContext } from "../context/userContext";
import Avatar from "react-avatar";
import { postQuiz } from "../api/quizzes/Post";
import { fetchQuizzes } from "../api/quizzes/Get";
import { deleteQuiz } from "../api/quizzes/Delete";
import { useNavigate } from "react-router-dom";
import { patchQuiz } from "../api/quizzes/Patch";

//console.log(id,token)
const QuizEntry = () => {
  const { username, title, setTitle, description, setDescription } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("authToken");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  // Fetch existing quizzes
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const dataAll = await fetchQuizzes();
        const data = dataAll.filter((item) => item.id === id);
        //console.log(data[0]?.Questions);
        localStorage.setItem("currentQuizId", data[0]?.Questions[0]?.quizID);
        setQuizzes(data[0]?.Questions);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };
    loadQuizzes();
  }, [questions]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleSaveQuiz = async () => {
    if (quizTitle.trim() && options.every((option) => option.text.trim())) {
      const correctAnswer = options.find((option) => option.isCorrect)?.text;

      if (!correctAnswer) {
        alert("Please select the correct answer.");
        return;
      }

      const newQuiz = {
        question: quizTitle,
        options: options.map((option) => option.text),
        correctAnswer: correctAnswer,
      };

      try {
        const savedQuiz = await postQuiz(id, token, newQuiz);
        setQuestions([...questions, savedQuiz]); // Add the saved quiz to local state
        setQuizTitle(""); // Clear inputs
        setOptions([
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
      } catch (error) {
        console.error("Failed to save quiz:", error);
        alert("Error saving quiz. Please try again.");
      }
    } else {
      alert("Please complete the question and options before saving.");
    }
  };

  const handleDelete = async (questionID) => {
    try {
      // Call the API to delete the quiz
      await deleteQuiz(questionID);

      // Remove the deleted quiz from the state
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== questionID)
      );
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Error deleting quiz. Please try again.");
    }
  };

  const handleCompleteQuiz = async (id) => {
    const data = {
      status: "published",
      title: title,
      description: description,
    };
    try {
      
      await patchQuiz(id, data);

      setTitle("");
      setDescription("");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error completing the quiz:", error);
      alert("Something went wrong while completing the quiz.");
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen flex text-left">
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

      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="#" className="text-gray-600 hover:text-buzzr-purple">
                  Home
                </a>
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-buzzr-purple"
                  aria-current="page"
                >
                  Quizzes
                </a>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions: {questions.length}
              </div>
              <p className="text-gray-600 mb-4">{description}</p>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Create Quiz
                </h2>

                <div>
                  <label
                    htmlFor="quizTitle"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Question Title
                  </label>
                  <input
                    type="text"
                    id="quizTitle"
                    name="quizTitle"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                    placeholder="Enter quiz title"
                  />
                </div>

                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                <div id="optionsContainer" className="space-y-2 mt-4">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={() => handleCheckboxChange(index)}
                        className="text-primary focus:ring-0 w-4 h-4"
                      />
                      <label htmlFor={`optionText${index}`} className="sr-only">
                        Option {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`optionText${index}`}
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                  onClick={handleSaveQuiz}
                >
                  Save Quiz
                </button>
              </div>
            </div>

            {/* Right Column - Render Existing Quizzes */}
            <div className="px-4">
              {quizzes?.map((quiz, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-sm mb-4"
                >
                  <div className="bg-white p-6 !pb-2">
                    {/* Render the quiz question */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {index + 1}. {quiz.question}
                      </h3>
                    </div>
                    {/* Render the quiz options as radio buttons */}
                    <div className="space-y-2">
                      {quiz.options.map((option, i) => (
                        <label key={i} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`answer${index}`}
                            className="form-radio text-buzzr-purple"
                            checked={option === quiz.correctAnswer} // Default checked if the option matches correctAnswer
                            onChange={() => handleOptionChange(index, option)} // Handle change if required
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Render action buttons */}
                  <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-primary hover:text-primary/80 font-medium"
                      onClick={() => handleEdit(index)} // Define `handleEdit` function for editing
                    >
                      Edit Question
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 mt-5"
          onClick={() => handleCompleteQuiz(quizzes[0]?.quizId)}
        >
          Publish Quiz
        </button>
      </main>
    </div>
  );
};

export default QuizEntry;
