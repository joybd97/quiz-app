import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { submitQuiz } from '../../api/quizzes/Post';

export default function QuizQuestion({ quizInfo, quizCount, setQuizCount, quizId }) {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState({});
    const [submitResponse, setSubmitResponse] = useState();


    const handleAnswerSelection = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNextQuestionOrSubmitQuiz = () => {
        if (quizCount < quizInfo?.questions.length - 1) {
            setQuizCount(quizCount + 1); // Fix case sensitivity issue here
        } else {
            const token = localStorage.getItem("authToken");
            const payload = { answers: { ...answers } };
            //console.log(payload)

            // const submitResponse = submitQuiz(quizId, token, payload);
            submitQuiz(quizId, token, payload).then((response) => {
                console.log(response[0]?.data);
                localStorage.setItem("result", JSON.stringify(response[0]?.data));
                if (response[0]?.data) {
                    setSubmitResponse(response[0]?.data);
                } else {
                    console.log(response?.[1]);
                }
            });

            navigate("/result", { replace: true });
        }
    };

//   console.log(submitResponse)


    const currentQuestion = quizInfo?.questions[quizCount];

    return (
        <div className="bg-white p-6 !pb-2 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                    {quizCount + 1}. {currentQuestion?.question}
                </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {currentQuestion?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg cursor-pointer">
                        <input
                            type="radio"
                            name={`question-${currentQuestion?.id}`}
                            id={option}
                            value={option}
                            className="form-radio text-buzzr-purple"
                            checked={answers[currentQuestion?.id] === option}
                            onChange={() => handleAnswerSelection(currentQuestion?.id, option)}
                        />
                        <label htmlFor={option}>
                            {option}
                        </label>
                    </div>

                ))}
            </div>
            <button
                onClick={handleNextQuestionOrSubmitQuiz}
                className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            >
                {quizCount < quizInfo?.questions.length - 1 ? 'Next' : 'Submit'}
            </button>
        </div>
    );
}
