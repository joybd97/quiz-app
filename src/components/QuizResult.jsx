import React, { useEffect, useState } from "react";
import logo from '../assets/logo.svg'
import { fetchQuizByID } from "../api/quizzes/Get";
import ResultInfo from "./result/ResultInfo";
import { toast } from "react-toastify";
import CorrectAnswer from "./result/CorrectAnswer";

const QuizResult = () => {
    const [result, setResult] = useState(null);
    const [totalMarks, setTotalMarks] = useState(0);
    const [quizInfo, setQuizInfo] = useState()

    useEffect(() => {
        const savedResult = localStorage.getItem("result");

        if (savedResult) {
            const parsedResult = JSON.parse(savedResult);
            setResult(parsedResult);

            const { correct_answers, submitted_answers } = parsedResult;
            let marks = 0;

            submitted_answers.forEach((submitted) => {
                const correctAnswer = correct_answers.find(
                    (correct) => correct.question_id === submitted.question_id
                );
                if (correctAnswer && correctAnswer.answer === submitted.answer) {
                    marks += correctAnswer.marks;
                }
            });

            setTotalMarks(marks);
        }
    }, []);

    useEffect(() => {
        if(result){
            fetchQuizByID(result?.quiz?.id).then((response) => {
                //console.log(response[0])
                if (response[0]) {
                    setQuizInfo(response?.[0]);
                } else {
                    toast.error(response?.[1] || "Failed to fetch quizze");
                }
            });
        }
    }, [result]);


    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                <img src={logo} className="max-h-11 fixed left-6 top-6 z-50" alt="Logo" />

                {/* Left side */}

                <ResultInfo
                    result={result}
                    totalMarks={totalMarks} 
                    />


                {/* Right side */}
                
                <CorrectAnswer
                    result={result}
                    quizInfo={quizInfo}
                />
            </div>
        </div>
    );
};

export default QuizResult;
