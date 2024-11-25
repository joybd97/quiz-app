import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const deleteQuiz = async (id) => {
    const token = localStorage.getItem('authToken')
    return (
        axios.delete(
            `http://localhost:5000/api/admin/questions/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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


export const deleteQuizSet = async (id) => {
    const token = localStorage.getItem('authToken')
    return (
        axios.delete(
            `http://localhost:5000/api/admin/quizzes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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
