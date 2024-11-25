import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const patchQuiz = async (id, data) => {
    //console.log(id, data)
    const token = localStorage.getItem('authToken');
    return (
       axios.patch(
            `http://localhost:5000/api/admin/quizzes/${id}`,
            data,
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
        .catch((error) =>{
            return [false, handleAPIError(error)]
        })
    )
};

export const updateQuestion = async (id, data) => {
    //console.log(id, token)
    const token = localStorage.getItem('authToken');
    return (
        axios.patch(
            `http://localhost:5000/api/admin/questions/${id}`,
            data,
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

