import React, { useEffect, useState } from "react";
import CardLogo from "../../assets/icons/CardLogo.svg";
import { deleteQuizSet } from "../../api/quizzes/Delete";
import { toast } from 'react-toastify';
import { adminQuizzes } from "../../api/quizzes/Get";



const SingleQuiz = ({ quiz }) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        adminQuizzes().then((response) => {
            if (response?.[0]?.data) {
                setQuizzes(response[0].data);
            } else {
                toast.error(response?.[1] || "Failed to fetch quizzes");
            }
        });
    }, []);

    const handleDelete = async (id) => {
        deleteQuizSet(id).then(response => {
            if (response?.[0]) {
                toast.success('Quiz is successfully deleted!');
                setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
            } else {
                toast.error(response?.[1]);
            }
        })
    };


    return (
        <>
            <div
                key={quiz.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group"
            >
                <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <img src={CardLogo} alt={"cardLogo"} />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                    {quiz.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                    {quiz.description}
                </p>
                <button
                    onClick={() => handleDelete(quiz.id)}
                    className="mt-4 text-red-600 hover:underline"
                >
                    Delete
                </button>
            </div>
        </>
    );
};

export default SingleQuiz;
