import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const createQuiz = async (quizData, token) => {
    return (
        axios.post(
            `http://localhost:5000/api/admin/quizzes`,
            quizData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                return [response?.data]
            })
            .catch((error) => {
                return [false, handleAPIError(error)]
            })
    )
};


export const postQuiz = async (id, token, quizData) => {
    return (
        axios.post(
            `http://localhost:5000/api/admin/quizzes/${id}/questions`,
            quizData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                return [response?.data]
            })
            .catch((error) => {
                return [false, handleAPIError(error)]
            })
    )
};

export const submitQuiz = async (id, token, quizData) => {
    return (
        axios.post(
            `http://localhost:5000/api/quizzes/${id}/attempt`,
            quizData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                return [response?.data]
            })
            .catch((error) => {
                return [false, handleAPIError(error)]
            })
    )
};

