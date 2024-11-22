import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const deleteQuiz = async (id) => {
    const token = localStorage.getItem('authToken')
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/admin/questions/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response?.data;
    } catch (error) {
        return [false, handleAPIError(error)];
    }
};


export const deleteQuizSet = async (id) => {
    const token = localStorage.getItem('authToken')
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/admin/quizzes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response?.data;
    } catch (error) {
        return [false, handleAPIError(error)];
    }
};
