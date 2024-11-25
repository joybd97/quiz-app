import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { postQuiz } from "../api/quizzes/Post";
import { fetchQuizzes } from "../api/quizzes/Get";
import { deleteQuiz } from "../api/quizzes/Delete";
import { useNavigate } from "react-router-dom";
import { patchQuiz, updateQuestion } from "../api/quizzes/Patch";
import { toast } from "react-toastify";
import { QuizList } from "./quizEntry/QuizList";
import AdminLeftPanel from "./common/AdminLeftPanel";
import { TopNav } from "./quizEntry/TopNav";
import { QuestionEntry } from "./quizEntry/QuestionEntry";

const QuizEntry = () => {
  const { title, setTitle, description, setDescription } =
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
  const [editingQuizId, setEditingQuizId] = useState()
  const [editQuiz, setEditQuiz] = useState(false)

  // Fetch existing quizzes
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const dataAll = await fetchQuizzes();
        const data = dataAll.filter((item) => item.id === id);
        //console.log(data[0]?.Questions);
        //localStorage.setItem("currentQuizId", data[0]?.Questions[0]?.quizID);
        setQuizzes(data[0]?.Questions || []);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
        toast.error("Failed to load quizzes");
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
        toast("Please select the correct answer.");
        return;
      }

      const newQuiz = {
        question: quizTitle,
        options: options.map((option) => option.text),
        correctAnswer: correctAnswer,
      };

      try {
        if (!editQuiz) {
          console.log(id)
          const savedQuiz = await postQuiz(id,token, newQuiz);
          setQuestions([...questions, savedQuiz]);
        } else {
          const updateQuiz = await updateQuestion(editingQuizId, newQuiz)
          setQuestions([...questions, updateQuiz]);
          setEditQuiz(false)
        }

        //setQuestions([...questions, savedQuiz]); // Add the saved quiz to local state
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
      toast.error("Please complete the question and options before saving.");
      // alert("Please complete the question and options before saving.");
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
      toast.error("Error deleting quiz. Please try again.");
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuizId(quiz.id);
    setQuizTitle(quiz.question);
    setOptions(
      quiz.options.map((option) => ({
        text: option,
        isCorrect: option === quiz.correctAnswer,
      }))
    );
    setEditQuiz(true)
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
      toast.error("Something went wrong while completing the quiz.");
    }
  };



  return (
    <div className="bg-[#F5F3FF] min-h-screen flex text-left">
      {/* left nav bar */}
      <AdminLeftPanel />

      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <TopNav />

          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions: {quizzes.length}
              </div>
              <p className="text-gray-600 mb-4">{description}</p>
              {/* create question */}

              <QuestionEntry
                quizTitle={quizTitle}
                setQuizTitle={setQuizTitle}
                options={options}
                handleSaveQuiz={handleSaveQuiz}
                handleCheckboxChange={handleCheckboxChange}
                handleOptionChange={handleOptionChange} />
            </div>

            {/* Right Column - Render Existing Quizzes */}
            <QuizList
              quizzes={quizzes}
              setQuizzes={setQuizzes}
              handleDelete={handleDelete}
              handleEdit={handleEdit} />
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
